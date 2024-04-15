import { Flex, Layout } from "antd";
import { Content, Header as AntHeader } from "antd/es/layout/layout";
import Header from "@/components/Header";
import { FC } from "react";
import styled, { createGlobalStyle } from "styled-components";

interface IProps {
	children: React.ReactNode;
}

const NormalizeStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  h1, h2, h3, h4, h5, h6 {
	margin: 0;
  }
`;

const StyledContent = styled(Content)`
	margin: 1rem 3rem;
	@media (max-width: 768px) {
		margin: 1rem .5rem;
	}
`;

export const MainLayout: FC<IProps> = ({ children }) => {
	return (
		<>
			<NormalizeStyles />
			<Flex gap="middle" wrap="wrap">
				<Layout>
					<AntHeader>
						<Header />
					</AntHeader>
					<StyledContent>{children}</StyledContent>
				</Layout>
			</Flex>
		</>
	);
};
