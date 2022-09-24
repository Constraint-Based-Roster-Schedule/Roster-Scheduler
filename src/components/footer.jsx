import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { red } from '@mui/material/colors';
import logo from'../assets/logo.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#2EC4F3' : '#aa1384',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  textDecoration:'underline',
  color: 'white',
  fontWeight:'bold',
  
}));

export default function NestedGrid() {
  return (
    <Box sx={{ flexGrow: 1,backgroundColor:'#2EC4F3' }}>
      <Grid container spacing={2}sx={{ flexGrow: 1,backgroundColor:red }}>
        <Grid xs={12} md={5} lg={3}>
          <div className="img-class">
            <img src={logo} alt="" />
          </div>
        </Grid>
        <Grid container xs={12} md={7} lg={8} spacing={4}>
          <Grid xs={6} lg={3}>
            <Item>
              <Box
                id="category-a"
                sx={{ fontSize: '12px', textTransform: 'uppercase',alignItems:'center' }}
              >
                Follow us
              </Box>
              <Box component="ul" aria-labelledby="category-a" sx={{ pl: 2 ,alignItems:'center'}}>
                <li>
                  <td><FacebookIcon></FacebookIcon></td>
                  <td>Facebook</td>
                </li>
                <li>
                  <td><LinkedInIcon></LinkedInIcon></td>
                  <td>LinkedIn</td>
                </li>

                <li>
                  <td><TwitterIcon></TwitterIcon></td>
                  <td>Twitter</td>
                </li>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3}>
            <Item>
              <Box
                id="category-b"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Your Account
              </Box>
              <Box component="ul" aria-labelledby="category-b" sx={{ pl: 2 }}>
                <li>Signup</li>
                <li>Login</li>
                <li>Home</li>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3}>
            <Item>
              <Box
                id="category-c"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Visit
              </Box>
              <Box component="ul" aria-labelledby="category-c" sx={{ pl: 2 }}>
                <li>Contact us</li>
                <li>About us</li>
                <li>Gallery</li>
              </Box>
            </Item>
          </Grid>
          
        </Grid>
        <Grid
          xs={12}
          container
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: 'column', sm: 'row' }}
          sx={{ fontSize: '12px' }}
        >
          <Grid sx={{ order: { xs: 2, sm: 1 },fontSize: '12px',color:'#091856' ,fontWeight:'bold'}}>
          
            © Copyright TechNext
          </Grid>
          
        </Grid>
      </Grid>
    </Box>
  );
}
