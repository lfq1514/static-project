import logo from './logo.svg';
import './App.scss';
import { useEffect, useRef, useState } from 'react';
import { AppstoreOutlined,LoadingOutlined,PlusOutlined,CheckCircleFilled} from '@ant-design/icons';
import { message, Upload,Input, Button,Modal } from 'antd';

const mainColor='rgb(22, 119, 255)'
function App() {
  const [moduleList,setModuleList]=useState(
    [{name:'助学金申请系统',key:'1'},
    {name:'学籍注册系统',key:'2'},
    {name:'补录系统',key:'3'},
    {name:'团报系统',key:'4'},
    {name:'预约系统',key:'5'}])

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [time,setTime]=useState('')
    const [baseInfo,setBaseInfo]=useState({})
    const xmRef=useRef(null)
    const xbRef=useRef(null)
    const zjlxRef=useRef(null)
    const zjhmRef=useRef(null)
    const xxRef=useRef(null)
    const bkzyRef=useRef(null)
    const sjhmRef=useRef(null)
    const xjdxlRef=useRef(null)
    const dqRef=useRef(null)
    const hkRef=useRef(null)

    const [activeKey,setActiveKey]=useState('1')

    const [visible,setVisible]=useState(false)

    const [successInfo,setSuccessInfo]=useState({xm:'',dh:'',dq:'',sj:'',zy:'',bkxx:''})

    const moduleMap={
      '1':{
        mainTitle:'助学金申请系统',
        title1:'助学金金额',
        button1:'立即申请'
      },
      '2':{
        mainTitle:'学籍注册系统',
        title1:'户口',
        button1:'立即注册'
      }
      
    }
    useEffect(()=>{

      setInterval(()=>{
        getTime()

      },1000)

    },[])

    function getTime(){
      const t=new Date()
      const year=t.getFullYear()
      const month=(t.getMonth()+1)+''
      const day=t.getDate()+''
      const h=t.getHours()+''
      const m=t.getMinutes()+''
      const s=t.getSeconds()+''

      let showTime=`${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')} ${h.padStart(2,'0')}:${m.padStart(2,'0')}:${s.padStart(2,'0')}`
     const timeEle= document.getElementsByClassName('time')[0]
     timeEle.innerHTML=showTime
     return showTime
    }
  
    const handleChange = (info) => {
      getBase64(info.file.originFileObj , (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    };
    const getBase64 = (img, callback) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    };

    function TH(props){
      return <div  className={`th bL bT bR ${props.className}`} style={{...props.style||{}}}>
        {props.children}
      </div>
    }
    function TR(props){
      return <div className={`tr bL bT bR ${props.className}`} style={{...props.style||{}}}>
        {props.children}
      </div>
    }
    function TD(props){
      return <div className={`td bR ${props.className}`} style={{...props.style||{}}}>
      {props.children}
    </div>

    }

    function resist(){
      console.log('---',xmRef.current.input.value)
      setSuccessInfo({
        xm:xmRef.current.input.value,
        dh:sjhmRef.current.input.value,
        dq:dqRef.current.input.value,
        sj:getTime(),
        zy:bkzyRef.current.input.value,
        bkxx:xxRef.current.input.value,
      })
      setVisible(true)

    }
    //模块切换
    function moduleOnChange(activeKey){
      if(['1','2'].includes(activeKey)){
        setActiveKey(activeKey)
      }else {
        message.warning('当前系统正在开发中，尽请期待～～')

      }
    }

  return (
    <div className="homePage">
     <div className='leftArea'>
      <div className='imgUploaderArea'>
      <Upload
        name="avatar"
        listType="picture-circle"
        className='Upload'
        showUploadList={false}
        onChange={handleChange}
      >
        {imageUrl ? <img  src={imageUrl} alt="avatar" style={{ width: '100%' }} /> :  <button style={{ border: 0, background: 'none' }} type="button">
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
      </button>}
      </Upload>

      </div>
      <div className='moduleList'>
        {moduleList.map(({name,key})=>{
         return  <div key={key} className='moduleItem' style={{color: activeKey===key?'#ccc':'inherit'}} onClick={()=>{
          moduleOnChange(key)

         }}>
            <AppstoreOutlined />
            <span className='moduleItemText'>{name}</span>
          </div>
        })}
      </div>
     </div>
     <div className='bigBox'>
     <div className='mainTitle'>{moduleMap[activeKey].mainTitle}</div>
      <div className='rightArea'>
     
      
      <div className='tabBar'>
        <div className='tabItem activeTab'>{moduleMap[activeKey].mainTitle}</div>
        <div className='tabItem'>注册须知</div>
      </div>
      <div className='billTime'>填表时间：<span className='time'>{time}</span></div>
      <div className='tipTitle'>提醒:本批次报名即将截止，自考档案通道将于2020年8月29日23:59关闭!!!</div>

      <div className='tableArea'>
       <TH >注册名额查询</TH>
       <TR >
          <TD className='tdWdithTitle'>地区</TD>
          <TD className="inputPD tdWdithValue"><Input/></TD>
          <TD className='tdWdithTitle'>时间</TD>
          <TD className="inputPD tdWdithValue"><Input/></TD>
          <TD className='noBR' style={{width:'250px'}}><Button style={{backgroundColor:mainColor, color:'#fff'}} onClick={()=>{ message.success('查询成功')}}>查询</Button></TD>
       </TR>
       <TR className='dfCenter'> 
       <span style={{marginRight:'20px'}}>总名额:&nbsp;&nbsp;&nbsp;100</span>
       <span style={{marginRight:'20px'}}>已申请名额:&nbsp;&nbsp;&nbsp;80</span>
       <span style={{marginRight:'20px'}}>剩余名额:&nbsp;&nbsp;&nbsp;20</span></TR>
       <TH >学籍注册系统</TH>
       <TR >
          <TD className='tdWdithTitle'>姓名</TD>
          <TD className="inputPD tdWdithValue"><Input ref={xmRef}/></TD>
          <TD className='tdWdithTitle'>性别</TD>
          <TD className="inputPD tdWdithValue noBR"><Input  ref={xbRef} /></TD>
       </TR>
       <TR >
          <TD className='tdWdithTitle'>证件类型</TD>
          <TD className="inputPD tdWdithValue"><Input  ref={zjlxRef}/></TD>
          <TD className='tdWdithTitle'>证件号码</TD>
          <TD className='inputPD tdWdithValue noBR'><Input  ref={zjhmRef}/></TD>
       </TR>
       <TR >
          <TD className='tdWdithTitle'>学校</TD>
          <TD className="inputPD tdWdithValue"><Input  ref={xxRef}/></TD>
          <TD className='tdWdithTitle'>报考专业</TD>
          <TD className='inputPD tdWdithValue noBR'><Input  ref={bkzyRef}/></TD>
       </TR>
       <TR >
          <TD className='tdWdithTitle'>手机号码</TD>
          <TD className="inputPD tdWdithValue"><Input  ref={sjhmRef}/></TD>
          <TD className='tdWdithTitle'>现阶段学历</TD>
          <TD className='inputPD tdWdithValue noBR'><Input  ref={xjdxlRef}/></TD>
       </TR>
       <TR >
          <TD className='tdWdithTitle'>地区</TD>
          <TD className="inputPD tdWdithValue"><Input  ref={dqRef}/></TD>
          <TD className='tdWdithTitle'> {moduleMap[activeKey].title1}</TD>
          <TD className='inputPD tdWdithValue noBR'><Input  ref={hkRef}/></TD>
       </TR>
       <TR  className='dfCenter'> <Button onClick={resist} style={{backgroundColor:mainColor,color:'#fff'}}>{moduleMap[activeKey].button1}</Button> </TR>
       <TR  style={{height:'auto',flexDirection:'column',alignItems: 'flex-start',padding:'10px 0'}}> 
       <p>注:</p>
       <p>1、报考信息统一录入学籍注册系统，考前指导学员报名</p>
       <p>2、提交之前务必确认学员报考信息正确，以免错报误报</p>
        </TR>
        <TH >学籍注册申请名单一览表</TH>
        <TR >
          <TD className='tdWdith1'>报名学员姓名</TD>
          <TD className='tdWdith2'>手机号</TD>
          <TD className='tdWdith3 noBR'>身份证后四位</TD>
       </TR>
        <TR className='bB'>
          <TD className='tdWdith1'>程俊</TD>
          <TD className='tdWdith2'>155****20</TD>
          <TD className='tdWdith3 noBR'>*****************732X</TD>
       </TR>
        
      </div>
      {
        visible&& <Modal
        title="注册成功"
        centered
        open={visible}
        width={800}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={
            <Button style={{backgroundColor:mainColor, color:'#fff'}} onClick={() => setVisible(false)}>确定</Button>
        }
      >
        <div className='modalBox'>
         <div className='modalTop'>
          <div className='step'>
            <CheckCircleFilled style={{color:mainColor,fontSize:'30px'}}/>
            学员注册申请
          </div>
          <div className='line'></div>
          <div className='step'>
            <CheckCircleFilled style={{color:mainColor,fontSize:'30px'}}/>
            填写基本信息
          </div>
          <div className='line'></div>
          <div className='step'>
            <CheckCircleFilled  style={{color:mainColor,fontSize:'30px'}}/>
            申请成功
          </div>

         </div>
         <div className='modalMiddle'>
          <CheckCircleFilled style={{color:mainColor,fontSize:'60px'}}/>
          <div className='middleText'>
            <div>您的注册已申请成功!</div>
            <div>请缴纳学费</div>
          </div>

         </div>
         <div>

         </div>
        <TR>
          <TD className='tdWdithTitle'>姓名</TD>
          <TD className="tdWdithValue">{successInfo.xm}</TD>
          <TD className='tdWdithTitle'>电话</TD>
          <TD className="tdWdithValue">{successInfo.dh}</TD>
       </TR>
       <TR>
          <TD className='tdWdithTitle'>地区</TD>
          <TD className="tdWdithValue">{successInfo.dq}</TD>
          <TD className='tdWdithTitle'>时间</TD>
          <TD className="tdWdithValue">{successInfo.sj}</TD>
       </TR>
       <TR className='bB'>
          <TD className='tdWdithTitle'>专业</TD>
          <TD className="tdWdithValue">{successInfo.zy}</TD>
          <TD className='tdWdithTitle'>报考学校</TD>
          <TD className="tdWdithValue">{successInfo.bkxx}</TD>
       </TR>
      
        </div>
       
      </Modal>

      }
     

     </div>
     </div>
    </div>
  );
}

export default App;
