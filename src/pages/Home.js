import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom"



const pdfList = [
    {
        id : 1,
        pdf_name : "Sample-document1.pdf",
        pdf_link : "https://arxiv.org/pdf/2212.08011.pdf",
    },
    {
        id : 2,
        pdf_name : "Sample-document2.pdf",
        pdf_link : "https://arxiv.org/pdf/2212.07937.pdf",
    },
    {
        id : 3,
        pdf_name : "Sample-document3.pdf",
        pdf_link : "https://arxiv.org/pdf/2212.07931.pdf",
    },
]

const Home = () => {
  return (
    <>
        <Main>
        <Container>
        <Header>
            <h2>Documents</h2>
        </Header>

        <DataList>
            <Listul>
                {
                    pdfList.map((item) => {
                        return (
                            <>
                                <Navlist key={item.id}>
                                <Link to={`/pdf/${item.pdf_name}`} state={{pdflinks : item.pdf_link}}>
                                {item.pdf_name}
                                </Link>
                               
                                </Navlist>
                            </>
                        )
                    })
                }
            </Listul>
        </DataList>
        </Container>
        </Main>
    </>
  )
}

const Main = styled.div`
width: 100%;
height: 100vh;
`;

const Container = styled.div`
position: relative;
width: 100%;
max-width: 400px;
height: 100%;
padding: 20px;
/* background-color: aliceblue; */
`;


const Header = styled.div`
width: 100%;
border-bottom: 1px solid #000;
`;

const DataList = styled.div`
display: flex;
flex-direction: column;
/* background-color: yellowgreen; */
padding-left: 20px;
`;

const Listul = styled.ul`
list-style: none;

`;

const Navlist = styled.li`
position: relative;
padding: 10px;

a {
    color: blue;
    font-size: 20px;
    font-weight: 700;
}

&::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -10px;
    color: blue;
    width: 8px;
    height: 1px;
    background-color: blue;
}
`;
export default Home