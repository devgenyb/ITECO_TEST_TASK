import { Flex, Typography } from "antd";
import styled from "styled-components";

const TextStyled = styled(Typography.Text)`
	color: white;
`;

export const Header = () => {
	return (
		<Flex vertical>
			<TextStyled>
				ТЗ ITECO{" "}
				<a
					style={{ color: "white", textDecoration: "underline" }}
					href="https://nn.hh.ru/vacancy/95778726"
					target="_blank"
				>
					на вакансию
				</a>
			</TextStyled>
			<TextStyled>
				<a
					style={{ color: "white", textDecoration: "underline" }}
					href="https://github.com/devgenyb/ITECO_TEST_TASK"
					target="_blank"
				>
					Репозиторий
				</a>{" "}
				https://github.com/devgenyb/ITECO_TEST_TASK
			</TextStyled>
			<TextStyled>git@github.com:devgenyb/ITECO_TEST_TASK.git</TextStyled>
		</Flex>
	);
};
