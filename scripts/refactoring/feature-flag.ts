import { JsxAttribute, Node, Project, SyntaxKind } from "ts-morph";

/**
 * @desc Скрипт для автоматического рефакторинга:
 * удаление или оставление новых фичей во всем коде.
 * Ищет во всем проекте функцию toggleFeatures и/или компонент <ToggleFeature />, в зависимости от
 * аргумента в скрипте либо оставляем новую фичу, либо удаляем.
 *
 * Фича флаги для каждого пользователя должны быть указаны в БД.
 */

const removedFeatureName = process.argv[2]; // Название фичи. Напр., isArticleEnabled
const featureState = process.argv[3]; // Флаг: on или off

const toggleFunctionName = "toggleFeatures";
const toggleComponentName = "ToggleFeatures";

if (!removedFeatureName) {
    throw new Error("Укажите название фича-флага");
}

if (!featureState) {
    throw new Error("Укажите состояние фичи: on или off");
}

if (featureState !== "on" && featureState !== "off") {
    throw new Error("Некорректное значение состояния фичи: или on, или off");
}

const project = new Project({});

project.addSourceFilesAtPaths("src/**/*.ts");
project.addSourceFilesAtPaths("src/**/*.tsx");

const files = project.getSourceFiles();

/**
 * Ищем toggleFeatures функцию по проекту. Ищем ее в ast.
 * Интерактивное абстрактно-синтаксическое дерево: astexplorer.net.
 */

/**
 * @desc Функция-хелпер. Ищем идентификатор toggleFeatures
 */
function isToggleFunction(node: Node) {
    let isToggleFeatures = false;

    node.forEachChild((child) => {
        if (
            child.isKind(SyntaxKind.Identifier) &&
            child.getText() === toggleFunctionName
        ) {
            isToggleFeatures = true;
        }
    });

    return isToggleFeatures;
}

/**
 * @desc Ищем идентификатор ToggleFeature
 */
function isToggleComponent(node: Node) {
    const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

    return identifier?.getText() === toggleComponentName;
}

const replaceToggleFunction = (node: Node) => {
    const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression
    );

    if (!objectOptions) return;

    const featureNameProperty = objectOptions.getProperty("name");

    const onFunctionProperty = objectOptions.getProperty("on");
    const offFunctionProperty = objectOptions.getProperty("off");

    const featureName = featureNameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1);

    const onFunction = onFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction
    );
    const offFunction = offFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction
    );

    if (featureName !== removedFeatureName) return;

    if (featureState === "on") {
        node.replaceWithText(onFunction?.getBody().getText() ?? "");
    }

    if (featureState === "off") {
        node.replaceWithText(offFunction?.getBody().getText() ?? "");
    }
};

const getAttributeNodeByName = (
    jsxAttributes: JsxAttribute[],
    name: string
) => {
    return jsxAttributes.find((node) => node.getName() === name);
};

const getReplacedComponent = (attribute?: JsxAttribute) => {
    const value = attribute
        ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
        ?.getExpression()
        ?.getText();

    if (value?.startsWith("(")) {
        return value.slice(1, -1);
    }

    return value;
};

const replaceComponent = (node: Node) => {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

    const onAttribute = getAttributeNodeByName(attributes, "on");
    const offAttribute = getAttributeNodeByName(attributes, "off");

    const featureNameAttribute = getAttributeNodeByName(attributes, "feature");
    const featureName = featureNameAttribute
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1);

    if (featureName !== removedFeatureName) return;

    const offValue = getReplacedComponent(offAttribute);
    const onValue = getReplacedComponent(onAttribute);

    if (featureState === "on" && onValue) {
        node.replaceWithText(onValue);
    }

    if (featureState === "off" && offValue) {
        node.replaceWithText(offValue);
    }
};

files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            return replaceToggleFunction(node);
        }

        if (
            node.isKind(SyntaxKind.JsxSelfClosingElement) &&
            isToggleComponent(node)
        ) {
            return replaceComponent(node);
        }
    });
});

project.save();
