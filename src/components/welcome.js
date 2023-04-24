import React, { useState } from "react";
import {  Layout,  Col, Row, Button , Image, Input, Alert } from 'antd';
import { randQuestion } from '../service/request';
const { Content } = Layout;







const Welcome = ()=> {

    const[viewStart, setviewStart] = useState(true);
    const[viewQuestion, setviewQuestion] = useState(false);
    const[viewMessage, setviewMessage] = useState(false);
    const[success, setSuccess]=useState(false);
    const[error, setError]=useState(false);
    const[list, setList]=useState({});
    const[answer, setAnswer]=useState("");
    const[qnumber,setQNumber]=useState(1);
    const[pass,setPass]=useState(0);





    const getData= async()=> {
            
            var answer= await randQuestion();
            setList(answer);
            console.log(answer);
        }
    
    

    const start=() =>{
        setviewStart(false);
        setviewQuestion(true);
        
        getData();

    }
    const next=()=>{
        if(qnumber==20){
            setviewQuestion(false);
            setviewMessage(true);
            if(pass>=15){
                console.log("pass")
                setSuccess(true);
            }
            else{
                console.log("fail");
                setError(true);
            }
        }
        else{
            if(answer==list.data.solution){
                console.log("Success")
                setPass(pass+1)
            
            }
            setAnswer("");           
            getData();
            console.log(answer);
            setQNumber(qnumber+1)
    
    
        }
        
        
        
    }


    const changeInput=(event)=>{
        console.log(event.target.value);
        setAnswer(event.target.value);


    }
    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
                <div>
                    {viewStart &&
                    <Row>
                        <Col className="gutter-row" span={12}></Col>
                        <Col className="gutter-row" span={12}>
                        <p>Welcome to Oak International School Online Asesment</p>
                        <Button type="primary" onClick={start}> 
                        Let's Get Start</Button>
                        </Col>
                    </Row>
                    }
                    <br/>
                    {viewQuestion &&
                    <Row>
                    
                        <Col className="gutter-row" span={12}></Col>
                        <Col className="gutter-row" span={6}>
                        <h1>Question number {qnumber} </h1>
                        <Image width={200}
                        src={list?.data?.question}/> 
                        <br/><br/>
                        <label>Answer</label>
                        <Input className='input' onChange={changeInput} placeholder="Answer" value={answer}/>;

                        <Button type="primary" onClick={next}>Next</Button>
                        </Col>           
                    </Row>
                    }
                    {viewMessage &&
                    <Row>
                        <Col className="gutter-row" span={12}></Col>
                        <Col className="gutter-row" span={6}>
                    {success && 
                        <Alert message="Congratulations You have selected for the Super Class" type="success" />
                    } 

                    {error &&
                      
                        <Alert message="Sorry You have not Selected" type="error" />
                    }
                        </Col>
                    </Row>
                    }
                </div>
            </Content>
        </Layout>


    )
}
export default Welcome