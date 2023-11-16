import { classNames } from "./classNames";

describe("classNames testing", () => {
    test("One class", () => {
        expect(classNames("main-class", {}, [])).toBe("main-class");
    });

    test("One class and mod's", () => {
        expect(
            classNames("main-class", { active: true, scrollable: false }, [])
        ).toBe("main-class active");
    });

    test("Main class, mod's and additional", () => {
        expect(
            classNames("main-class", { active: true }, ["additional", "hello"])
        ).toBe("main-class additional hello active");
    });

    test("Without classes", () => {
        expect(classNames("", {}, [])).toBe("");
    });

    test("Undefined mod", () => {
        expect(classNames("main-class", { active: undefined }, [])).toBe(
            "main-class"
        );
    });
});
