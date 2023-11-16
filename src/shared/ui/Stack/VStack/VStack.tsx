import { Flex, FlexProps } from "../Flex/Flex";

type VStackProps = Omit<FlexProps, "direction">;

export const VStack = ({ align = "start", ...props }: VStackProps) => {
    return <Flex {...props} direction="column" align={align} />;
};
