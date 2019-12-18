import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';


const useStyles = makeStyles({
    root: {
        background: '#D0001B',
        borderRadius: '3px',
        fontSize: '16px',
        color: 'white',
        height: '48px',
        padding: '0 30px'
    }
    ,
});

 function Footer() {
    const classes = useStyles();
    const [value, setValue] = React.useState('home');

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    return ( 
    <div className="navigation" 
            style={{ 
        display: 'inline-block',
        width: '100%',
        height: '50',
        padding: '10px 30px',
        background: '#D0001B',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',        
        textAlign:'center'
        }}>
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction style={{color:'white'}} label="BeCentral, Cantersteen 12, 1000 Bruxelles" value="location" icon={<LocationOnIcon/>} />
        <BottomNavigationAction style={{color:'white'}} label="+32 6 85567888" value="phone" icon={<PhoneIcon />} />
        <BottomNavigationAction style={{color:'white'}} label="contact@cookit.be" value="contact-mail" icon={<ContactMailIcon />} />
    </BottomNavigation>
        <div className="copyright" >
            <p className="footer-text" style={{ fontFamily: 'Serif', color:'white' }} >
            Copyright &copy; 2019 by <b><a href="https://hackyourfuture.be/" style={{ textDecoration: 'none', color:'white'}}> Hack Your Future</a></b>
            </p>
        </div>
    </div>
    
    );
}

export default Footer;