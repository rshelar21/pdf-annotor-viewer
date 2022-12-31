import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components';
import {useLocation} from "react-router-dom"

import { Viewer, Worker} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';






let element = null;
let arr = []


const Pdfview = () => {
    const fetchStorage =  () => {
        const storage = localStorage.getItem('data');
        if(storage === null) {
            setArray([])
        }
        else {
            setArray(JSON.parse(storage))
        }


    }
    useEffect(() => {
       
        fetchStorage();
        // console.log('useEffect called')
    })
    const [arrData , setArray] = useState([])
    // const [btnId, setBtnId] = useState('')
    const viewer = useRef(null);
    const posts = useRef({x : 0, y : 0});
    const btnRef = useRef(null);

   





    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: (defaultTabs) => [],
    });


    

    const location = useLocation();
   


    

    const drawRect = (e) => {
        console.log(e)
        btnRef.current = e.target.value
       
        // localStorage.clear();
        if(element !== null) {
            // element = null;
            // element === null;
            // removeAttribute("style");
            // console.log(document.body.lastChild , 'lastChild')
            // element.removeAttribute("style");
            element.remove();
            element = null;
            document.body.removeChild(element);
           
            // element.remove();
           
            console.log(element , 'element')
            console.log('removed')
            viewer.current.addEventListener('mousedown', getPoint);
            viewer.current.addEventListener('mouseup', removePoint);
            // element.current = null;
        }
        else {
            // getPoint(e);
            console.log('drawRect called')
            // console.log(btnRef.current.id)
            viewer.current.addEventListener('mousedown', getPoint);
            viewer.current.addEventListener('mouseup', removePoint);

            // viewer.current.addEventListener('mousemove', movePoint);
        }
    }

    const getPoint = (e) => {
        // console.log(e);
        // localStorage.clear();
        console.log('getPoint called next elemnt ')
        console.log(element , 'element')
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        posts.current.x = mouseX;
        posts.current.y = mouseY;
        console.log('mouse down' ,  posts.current.x,  posts.current.y);

    }


    const removePoint = (e) => {
        console.log('removePoint called')
        console.log(e)
        const upX = e.clientX;
        const upY = e.clientY;
        console.log('up is', upX, upY);
        getdata(upX, upY)
    }


    const getdata = (upX, upY) => {
        console.log('getdata called')
        console.log('val',  posts.current.x,  posts.current.y);
        const widthX = Number(upX) - Number( posts.current.x);
        const heightX = Number(upY) - Number( posts.current.y);

        console.log('width', widthX, heightX);
        movePoint(widthX, heightX);

    }


    const movePoint = (width, height) => {
        console.log('called')
        console.log(width, height)
        // console.log('btn', btnId)
        console.log('btn', btnRef.current)
        // element = null
        element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.top = posts.current.y + 'px';
        element.style.left = posts.current.x + 'px';
        element.style.width = width+ 'px';
        element.style.height = height + 'px';
        // element.style.border = '1px solid red';
        if(btnRef.current === 'Title'){
            element.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
            element.style.border = '1px solid red';
        }
        else {
            element.style.backgroundColor = 'rgba(144,238,144, 0.5)';
            element.style.border = '1px solid #75f075';
        }
        element.style.boxSizing = 'border-box';
        element.style.zIndex = '100';
        // element.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
        document.body.appendChild(element);
        

        getStorage()
    }

    const getStorage = () => {
        console.log('getStorage called')
        const storage = localStorage.getItem('data');
        console.log(storage);
        

        if(storage === null) {
            arr.push({
                x : posts.current.x,
                y : posts.current.y,
                width : element.style.width,
                height : element.style.height,
                name : btnRef.current,
            })
            localStorage.setItem('data', JSON.stringify(arr))
           

        }
        else {
            arr = JSON.parse(storage);
            arr.push({
                x : posts.current.x + 'px',
                y : posts.current.y + 'px',
                width : element.style.width,
                height : element.style.height,
                name : btnRef.current,
            })
            localStorage.setItem('data', JSON.stringify(arr))
            

        }
        // fetchStorage();

        console.log("done")
        

        
    }

    


   
   
    
 





   

    




    return (
        <>
            <Main>

                {/* data page */}
                <LeftDiv>
                    <Label>
                        <Header>
                            <h2>Labels</h2>
                        </Header>
{/*  ref={btnRef} */}
                        <Buttons>
                            <button id='btn' value="Title" onClick={drawRect}>Title</button>
                            <button id='btn' value="Author" onClick={drawRect}>Author</button>
                        </Buttons>

                    </Label>

                    <Boxes>
                        <Header>
                            <h2>Boxes</h2>
                        </Header>


                        <Coordinates>
                        {
                            arrData?.map((item, index) => {
                                return (
                                    <p key={index}>x : {item.x}    y : {item.y}   width : {item.width}    height : {item.height} {item.name}</p>
                                )
                            })
                        }



                        </Coordinates>


                    </Boxes>
                </LeftDiv>

                {/* pdf page */}

                <RightDiv>
                <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.js'>
                    <PDF className='webviewer' ref={viewer}>
                    <Viewer fileUrl={location.state.pdflinks} plugins={[defaultLayoutPluginInstance]} 
                        defaultScale={1} 
                    />
                  
                    </PDF>
                </Worker>
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
justify-content: space-between;
overflow: hidden;

@media (max-width: 1150px) {
    flex-direction: column;
    gap: 20px;
    /* overflow: unset; */
}

`;

const LeftDiv = styled.div`
position: relative;
width: 50%;
height: 100%;

display: flex;
flex-direction: column;
padding: 10px;
overflow: hidden;
@media (max-width: 1150px) {
    height: 50vh;
}
`;

const Label = styled.div`
position: relative;
width: 100%;
height: 40%;

`;

const Boxes = styled.div`
position: relative;
width: 100%;
height: 50%;
/* background-color: red; */

`;

const RightDiv = styled.div`
position: relative;
width: 50%;
height: 100%;
@media (max-width: 1150px) {
    max-width: 100%;
    width: 100%;
    height: 50vh;
}

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
/* background-color: yellowgreen; */
/* padding: 10px 0; */
position: relative;
max-height: 100%;
overflow: hidden;
overflow-y: scroll;
p {
    padding: 10px 0;

    &:first-child {
        padding-top: 0;
    }
}


`;

const PDF = styled.div`
overflow: hidden;
overflow-y: scroll;
height: 100%;
width: 100%;
overflow: hidden;

.rpv-default-layout__toolbar{
    display: none;
}


`



export default Pdfview
