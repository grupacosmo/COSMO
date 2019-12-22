import React, { useState } from "react";
// nodejs library that concatenates classes
// eslint-disable-next-line
import classNames from "classnames";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import Card from "components/Card/Card";
import { Link } from "react-scroll";

//Styling

const useStyles = makeStyles(styles);
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "purple"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "purple"
    }
  }
})(TextField);

// Contact Section Hook
const ConstactSection = props => {
  const classes = useStyles();

  //State
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [messageValid, setMessageValid] = useState(false);
  const [topicValid, setTopicValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [formValid, setFormValid] = useState(false);
  //Validation

  const validateForm = () => {
    if (messageValid && topicValid && nameValid && emailValid) {
      setFormValid(true);
    }
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          setEmailValid(true);
        }
        break;
      case "message":
        if (value.length > 0) {
          setMessageValid(true);
        }
        break;
      case "topic":
        if (value.length > 0) {
          setTopicValid(true);
        }
        break;
      case "name":
        if (value.length > 0) {
          setNameValid(true);
        }
        break;
      default:
        break;
    }
  };

  //Events
  const handleMessageChange = event => {
    setMessage(event.target.value);
    validateField("message", message);
    validateForm();
  };
  const handleNameChange = event => {
    setName(event.target.value);
    validateField("name", name);
    validateForm();
  };
  const handleEmailChange = event => {
    setEmail(event.target.value);
    validateField("email", email);
    validateForm();
  };
  const handleTopicChange = event => {
    setTopic(event.target.value);
    validateField("topic", topic);
    validateForm();
  };

  const handleSubmit = event => {
    const templateId = "template_n0q0WHx8";

    var template_params = {
      reply_to: email,
      name_html: name,
      topic_html: topic,
      message_html: message
    };
    sendFeedback(templateId, template_params);
  };

  const sendFeedback = (templateId, template_params) => {
    window.emailjs
      .send("gmail", templateId, template_params)
      .then(res => {
        console.log(template_params);
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
    // window.location.reload();
  };

  //this style and style below is using for centering description paragraph vertically
  const descriptionGridContainerStyle = {
    height: "100%"
  };

  const descriptionGridItemStyle = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  };

  const descriptionStyle = {
    textAlign: "justify",
    fontFamily: "Roboto Slab",
    padding: 20
  };

  return (
    <div className={classes.section} id="contact-form">
      <div className={classes.container}>
        <h2 className={classes.title}>Kontakt</h2>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <GridContainer
                justify="center"
                style={descriptionGridContainerStyle}>
                <GridItem
                  xs={12}
                  sm={12}
                  md={9}
                  style={descriptionGridItemStyle}>
                  <div className={classes.title}>
                    <h4>Lokalizacja</h4>
                  </div>
                  <p className={classes.description} style={descriptionStyle}>
                    Warszawska 24
                    <br />
                    Wydział Informatyki i telekomunikacji
                    <br />
                    Katedra Informatyki
                  </p>

                  <div className={classes.title}>
                    <h4>Adres Email</h4>
                  </div>
                  <p className={classes.description} style={descriptionStyle}>
                    kolocosmopk@gmail.com
                    <br />
                  </p>
                </GridItem>{" "}
              </GridContainer>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <div className={classes.title}>
              <h3>Wyślij nam wiadomość</h3>
            </div>
            <Card plain style={{ padding: 10 }}>
              <form className={classes.root} noValidate>
                <CssTextField
                  className={classes.margin}
                  id="custom-css-outlined-input"
                  label="Your Name"
                  value={name}
                  onChange={handleNameChange}
                  fullWidth
                  margin="dense"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <i className="fas fa-user" />
                      </InputAdornment>
                    )
                  }}
                />
                <CssTextField
                  className={classes.margin}
                  id="font-awesome"
                  required
                  label="Your email"
                  value={email}
                  onChange={handleEmailChange}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <i className="fas fa-at" />
                      </InputAdornment>
                    )
                  }}
                />
                <CssTextField
                  className={classes.margin}
                  id="font-awesome"
                  label="Topic"
                  value={topic}
                  onChange={handleTopicChange}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <i className="fas fa-star" />
                      </InputAdornment>
                    )
                  }}
                />
                <CssTextField
                  id="standard-multiline-flexible"
                  label="Your message"
                  multiline
                  value={message}
                  rows="2"
                  rowsMax="5"
                  fullWidth
                  onChange={handleMessageChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <i className="fas fa-comment" />
                      </InputAdornment>
                    )
                  }}
                />
                <Link
                  activeClass="active"
                  to="menu-navbar"
                  spy={true}
                  smooth={true}
                  offset={10}
                  duration={700}>
                  <Button
                    color="primary"
                    round
                    onClick={handleSubmit}
                    disabled={!formValid}>
                    Wyślij
                  </Button>
                </Link>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};
export default ConstactSection;
