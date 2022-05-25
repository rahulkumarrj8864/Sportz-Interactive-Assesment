import { Search } from '@mui/icons-material';
import React,{useState,useEffect} from 'react';
import "./App.css"


import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function SearchAppBar() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataApi, setDataApi] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
      setLoading(true)
        await fetch('http://localhost:5000/match')
        .then(res => res.json())
        .then(data => {
          setUsers(data)
          alert(`Assigment Api Not Work So I will Own Api Create And Complete this Project. \n Thank You!!`)
        })
        .catch(err => {
          alert(`Please Start Server (npm run server) this command use \n ${err}`)
            console.log(err);

        })
        setLoading(false)
      }
      // console.log(users);

    // const search=(key) => {
    //   console.warn(key);
    // }
    const handleSearch =async (e)=>{
      e.preventDefault()
      setLoading(true)
      await fetch(`http://localhost:5000/match?q=${e.target.value}`)
        .then(res => res.json())
        .then(data => {
          setUsers(data)
          // if(data.length > 0) {
          //   setUsers(data)
          // }else {
          //   setDataApi({dataApi:true,users:null})
          // }
        })
        .catch(err => {
            console.log(err);
            alert("Server not Work")
        })
        setLoading(false)
      console.warn(e.target.value);
    } 
  return (
      <>
      <div>
      <nav className="navbar bg-danger">
      <div className="container-fluid">
      <span className='ms-4 fs-5 fw-bold text-white'>Assigment</span>
      <div className='d-flex justify-content-center align-items-center me-4 border border-primary rounded-2' style={{width:"250px", height:"50px"}}>
      <Search className='text-white ms-2'/><input type="text" placeholder='Search Player Name' style={{background:"transparent",outline:"none",border:"transparent",marginLeft:"2px",color:"white"}}
        onChange={handleSearch}
      />
      </div>
      </div>
    </nav>
      </div>
      {/* <div className='bg-danger d-flex justify-content-between align-items-center' style={{width:"100%", height:"70px"}}>
      <span className='ms-4 fs-5 fw-bold text-white'>Assigment</span>
      <div className='d-flex justify-content-center align-items-center me-4 border border-primary rounded-2' style={{width:"250px", height:"50px"}}>
      <Search className='text-white'/><input type="text" placeholder='Search Player Name' style={{background:"transparent",outline:"none",border:"transparent",marginLeft:"2px",color:"white"}}
        onChange={handleSearch}
      />
      </div>
      </div> */}
      <div className="container-fluid mt-2">
      
         {/* <div className='row d-flex justify-content-center row-cols-4'>
       {
        users.map(res => (
      <div class="card m-2 p-0">
  <img src={res.img} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title text-muted">{res.name}</h5>
    <h6 className='text-success'>{res.skill}</h6>
    <h6 className='text-danger'>{res.value}</h6>
  </div>
</div>
        ))
      } 

      </div>*/}
      {
        loading?"Loading":<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className='mb-5'>
  {
    users.map((res,index) => (
      <Grid item xs={4} sm={4} md={4} key={index}>
      <div className="card m-2 p-0">
  <img src={res.img} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title text-muted">{res.name}</h5>
    <h6 className='text-success'>{res.skill}</h6>
    <h6 className='text-danger'>{res.value}</h6>
  </div>
</div>
      </Grid>
    ))
  }
</Grid>
      }
      
      {
         dataApi?<h1>No Found</h1>:false
      }
      </div>
      </>
  )
  }