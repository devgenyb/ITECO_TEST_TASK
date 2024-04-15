import { Typography } from 'antd';
import styled from 'styled-components';


const TestStyled = styled(Typography.Text)`
    color: white;
`

export const Header = () => {

    return (
        <div>
            <TestStyled>Header</TestStyled>
        </div>
    )
}