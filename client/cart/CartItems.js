import React, {useState} from 'react'
import auth from './../auth/auth-helper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import cart from './cart-helper.js'
import {Link} from 'react-router-dom'
import {CheckBox} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  card: {
    margin: '24px 0px',
    padding: '16px 40px 60px 40px',
    backgroundColor: '#80808017'
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: '1.2em'
  },
  price: {
    color: theme.palette.text.secondary,
    display: 'inline'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: 0,
    width: 50
  },
  productTitle: {
    fontSize: '1.15em',
    marginBottom: '5px'
  },
  subheading: {
    color: 'rgba(88, 114, 128, 0.67)',
    padding: '8px 10px 0',
    cursor: 'pointer',
    display: 'inline-block'
  },
  cart: {
    width: '100%',
    display: 'inline-flex'
  },
  details: {
    display: 'inline-block',
    width: "100%",
    padding: "4px"
  },
  content: {
    flex: '1 0 auto',
    padding: '16px 8px 0px'
  },
  cover: {
    width: 160,
    height: 125,
    margin: '8px'
  },
  itemTotal: {
    float: 'right',
    marginRight: '40px',
    fontSize: '1.5em',
    color: 'rgb(72, 175, 148)'
  },
  checkout: {
    float: 'right',
    margin: '24px'
  },
  total: {
    fontSize: '1.2em',
    color: 'rgb(53, 97, 85)',
    marginRight: '16px',
    fontWeight: '600',
    verticalAlign: 'bottom'
  },
  continueBtn: {
    marginLeft: '10px'
  },
  itemShop: {
    display: 'block',
    fontSize: '0.90em',
    color: '#78948f'
  },
  removeButton: {
    fontSize: '0.8em'
  },
  dropdown: {
    roundup: false
  },
  select:{
    height: '24px',
    width: "100%",
    backgroundColor: '#80808017'
  }
}))

export default function CartItems (props) {
  const classes = useStyles()
  const [cartItems, setCartItems] = useState(cart.getCart())

  let roundupCheck = false;
  let rd = 2;
  const handleChange = index => event => {
    let updatedCartItems = cartItems
    if(event.target.value === 0){
      updatedCartItems[index].quantity = 1
    }else{
      updatedCartItems[index].quantity = event.target.value
    }
    setCartItems([...updatedCartItems])
    cart.updateCart(index, event.target.value)
  }

  const getTotal = () => {
    return cartItems.reduce((a, b) => {
      return a + (b.quantity*b.product.price)
    }, 0)
  }

  const getRoundup = () => {
    //if the global is true, run the roundup formula and it will add to the total at the bottom of this file
    if(props.donationCheck === true) {
      //roundup formula goes here
      cart.setRoundUp(1-(getTotal()-Math.floor(getTotal())))
      return (1-(getTotal()-Math.floor(getTotal())))
    }
    else return 0
  }

  const removeItem = index => event =>{
    let updatedCartItems = cart.removeItem(index)
    if(updatedCartItems.length === 0){
      props.setCheckout(false)
    }
    setCartItems(updatedCartItems)
  }

  const openCheckout = () => {
    props.setCheckout(true)
  }
  const onCheck = ()=> {
    props.setDCheck(true)
  }

  function CharityDropDown() {
    const [items] = React.useState([
      {
        charity: "Roundup change to a charity?",
        name: "Title"
      },
      { charity: "American Humane", name: "American Humane" },
      { charity: "Best Friends Animal Society", name: "Best Friends Animal Society" },
      { charity: "National Disaster Search Dog Foundation", name: "National Disaster Search Dog Foundation" },
      { charity: "American Civil Liberties Union", name: "American Civil Liberties Union" },
      { charity: "Free Software Foundation", name: "Free Software Foundation" }
    ]);
    const handleSelect=(name)=>{
      //working on trying to set the global to true.
      console.log(name.toString())

      cart.setCharity(name.toString())

    }

    return (
        <div>
          {props.donationCheck === false && <select className={classes.select} onChange={ e=> cart.setCharity(e.target.value)}>
            {items.map(({charity, name}) => (
                <option key={charity} name={name} value={name}  >
                  {name}
                </option>
            ))

            }

          </select>
          }
          {props.donationCheck === true && <div>
            Donating to: {localStorage.getItem("charname")}

          </div>

          }
          {props.donationCheck === true && <div>
            Donation Amount: {localStorage.getItem("roundup")}

          </div>

          }
          {props.donationCheck === false &&
          <label>
            <input
                type="radio"
                name="react-tips"
                value="option2"
                className="form-check-input"
                onChange={onCheck}
            />
            Donate?
          </label>
          }
        </div>
    );
  };

  return (<Card className={classes.card}>
    <Typography type="title" className={classes.title}>
      Shopping Cart
    </Typography>
    {cartItems.length>0 ? (<span>
          {cartItems.map((item, i) => {
            return <span key={i}><Card className={classes.cart}>
              <CardMedia
                  className={classes.cover}
                  image={'/api/product/image/'+item.product._id}
                  title={item.product.name}
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Link to={'/product/'+item.product._id}><Typography type="title" component="h3" className={classes.productTitle} color="primary">{item.product.name}</Typography></Link>
                  <div>
                    <Typography type="subheading" component="h3" className={classes.price} color="primary">$ {item.product.price}</Typography>
                    <span className={classes.itemTotal}>${item.product.price * item.quantity}</span>
                    <span className={classes.itemShop}>Shop: {item.product.shop.name}</span>
                  </div>
                </CardContent>
                <div className={classes.subheading}>
                  Quantity: <TextField
                    value={item.quantity}
                    onChange={handleChange(i)}
                    type="number"
                    inputProps={{
                      min:1
                    }}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"/>
                            <Button className={classes.removeButton} color="primary" onClick={removeItem(i)}>x Remove</Button>
                </div>
              </div>
            </Card>
            <Divider/>
          </span>})
          }
          <divider>
      <CharityDropDown/>

      </divider>
          <div className={classes.checkout}>
            <span className={classes.total}>Total: ${getTotal() +   getRoundup()}</span>
            {!props.checkout && (auth.isAuthenticated()?
                <Button color="secondary" variant="contained" onClick={openCheckout}>Checkout</Button>
                :
                <Link to="/signin">
                  <Button color="primary" variant="contained">Sign in to checkout</Button>
                </Link>)}
            <Link to='/' className={classes.continueBtn}>
            <Button variant="contained">Continue Shopping</Button>
          </Link>
        </div>
      </span>) :
        <Typography variant="subtitle1" component="h3" color="primary">No items added to your cart.</Typography>
    }
  </Card>)
}

CartItems.propTypes = {
  checkout: PropTypes.bool.isRequired,
  setCheckout: PropTypes.func.isRequired,
  donationCheck: PropTypes.bool.isRequired,
  setDCheck: PropTypes.func.isRequired
}
