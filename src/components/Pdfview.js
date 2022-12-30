import React from 'react'
import styled from 'styled-components';
import {useLocation} from "react-router-dom"


const Pdfview = () => {
    const location = useLocation();

    return (
        <>
            <Main>

                {/* data page */}
                <LeftDiv>
                    <Label>
                        <Header>
                            <h2>Labels</h2>
                        </Header>

                        <Buttons>
                            <button >Title</button>
                            <button>Author</button>

                        </Buttons>

                    </Label>

                    <Boxes>
                        <Header>
                            <h2>Boxes</h2>
                        </Header>


                        <Coordinates>
                            <p>
                                x:220, y: 100, width: 100, height: 100 Title
                            </p>

                            <p>
                                x:220, y: 100, width: 100, height: 100 Title
                            </p>



                        </Coordinates>


                    </Boxes>
                </LeftDiv>

                {/* pdf page */}

                <RightDiv>
                    <iframe src={location.state.pdflinks} width="100%" height="100%"></iframe>
                </RightDiv>
            </Main>
        </>
    )
}


const Main = styled.div`
width: 100%;
height: 100vh;
display: flex;
align-items: center;
padding: 5px;
gap: 10px;
overflow: hidden;
`;

const LeftDiv = styled.div`
position: relative;
width: 50%;
height: 100%;

/* background-color: red; */
`;

const Label = styled.div`
position: relative;
width: 100%;
height: 50%;
/* background-color: yellow; */
padding: 20px;
`;

const Boxes = styled.div`
position: relative;
width: 100%;
height: 50%;
padding: 20px;
`;

const RightDiv = styled.div`
position: relative;
width: 50%;
height: 100%;
min-height: 100%;
border: 2px solid #000;

/* background-color: yellowgreen; */
`;

const Header = styled.div`
width: 100%;
border-bottom: 1px solid #000;
`;

const Buttons = styled.div`
padding: 20px 0;
display: flex;
flex-direction: row;
gap : 20px;

button {
    border: none;
    outline: none;
    padding: 10px;
    font-size: 18px;
    background-color: orange;
    font-weight: 700;
    cursor: pointer;

    &:nth-child(2) {
        background-color: lightgreen;
    }
}
`;


const Coordinates = styled.div`
padding: 10px 0;
position: relative;
max-height: 100%;
overflow: hidden;
overflow-y: scroll;
p {
    padding: 10px 0;
}

&::-webkit-scrollbar {
    /* display: none; */
}
`;

export default Pdfview
