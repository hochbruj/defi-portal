import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { useInitWeb3 } from "../../wallet/hooks/initWeb3";
import { usePrices } from "../../wallet/hooks/Prices";
import { useStore } from "../../store/store";
import { Grid, Button, Typography } from "@material-ui/core";
import { MetaMaskButton } from "rimble-ui";

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%"
  },
  grid: {
    height: "100%"
  },
  quoteContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/images/auth.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px"
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center"
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  formButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const store = useStore();
  const classes = useStyles();
  const { setWallet } = useInitWeb3();
  usePrices();

  const connectWallet = wallet => {
    setWallet(wallet);
  };

  if (store.state.web3) {
    return <Redirect to="/select-portfolio" />;
    //return <Redirect to="/dashboard" />;
  } else {
    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteContainer} item lg={5}>
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="h1">
                  Manage all your crypto assets in one place
                </Typography>
                <div className={classes.person}>
                  <Typography className={classes.name} variant="body1">
                    Defi Dashboard
                  </Typography>
                  {/* <Typography className={classes.bio} variant="body2">
                    Defi Portal
                  </Typography> */}
                </div>
              </div>
            </div>
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentBody}>
                <div className={classes.form}>
                  <Typography
                    className={classes.title}
                    variant="h2"
                    color="primary"
                  >
                    Sign in
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Sign in with email or phone (powered by Fortmatic)
                  </Typography>
                  <div className={classes.formButtons}>
                    <Button
                      color="primary"
                      onClick={() => connectWallet("Fortmatic")}
                      size="large"
                      fullWidth
                      variant="contained"
                    >
                      Sign in
                    </Button>
                  </div>
                  <Typography
                    align="center"
                    className={classes.sugestion}
                    color="textSecondary"
                    variant="body1"
                  >
                    or sign in with
                  </Typography>
                  <div className={classes.formButtons}>
                    <MetaMaskButton.Outline
                      width={1}
                      onClick={() => connectWallet("MetaMask")}
                    >
                      MetaMask
                    </MetaMaskButton.Outline>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
