import {useState, useEffect} from "react";

const BasicForm = () => {

  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    mailname: "",
  });
  
  const [formSent, setFormSent] = useState(false)
  const [formValid, setFormValid] = useState(false);
  const [formTouched, setFormTouched] = useState(false);

  const [individualValid, setIndividualValid] = useState([
    {
      firstname: false,
      lastname: false,
      mailname: false,
    },
  ])

  const firstname = input.firstname;
  const lastname = input.lastname;
  const mailname = input.mailname;

  const submitHandler = (event) => {
    event.preventDefault();
    const include = mailname.includes("@");
    if (lastname.length > 0 & mailname.length > 0 & firstname.length > 0 & include) {
      setFormValid(true);
      setFormSent(true)
      setInput((prev) => ({firstname: "", mailname: "", lastname: ""}))
    }
    if ( lastname.length < 1 || mailname.length < 1 || firstname.length < 0 || !include) {
      setFormValid(false);
    }
    setFormTouched(true);
    console.log(`First Name: ${firstname}, Last name: ${lastname}, Mail Adress: ${mailname}`)
  };

  const blur = (event) => {
    if (event.target.value.length < 1) {
      setFormValid(false);
      setFormTouched(true);
      const target = event.target;
      if (target.id === "firstname") {
        setIndividualValid((prev) => ({
          firstname: true,
          lastname: false,
          mailname: false,
        }));
      }
      if (target.id === "lastname") {
        setIndividualValid((prev) => ({
          firstname: false,
          lastname: true,
          mailname: false,
        }));
      }
      if (target.id === "mailname") {
        setIndividualValid((prev) => ({
          firstname: false,
          lastname: false,
          mailname: true,
        }));
      }
    }
    if (event.target.value.length > 1) {
      setFormTouched(false);
      setIndividualValid((prev) => ({
        firstname: false,
        lastname: false,
        mailname: false,
      }));
    }
  };

  const changeHandler = (event, index) => {
    if (event.target.id === "firstname") {
      let firstNameValue = event.target.value;
      setInput((prev) => ({
        firstname: firstNameValue,
        lastname: prev.lastname,
        mailname: prev.mailname,
      }));
    }
    if (event.target.id === "lastname") {
      let lastNameValue = event.target.value;
      setInput((prev) => ({
        firstname: prev.firstname,
        lastname: lastNameValue,
        mailname: prev.mailname,
      }));
    }
    if (event.target.id === "mailname") {
      let mailNameValue = event.target.value;
      setInput((prev) => ({
        firstname: prev.firstname,
        lastname: prev.lastname,
        mailname: mailNameValue,
      }));
    }
  };

  useEffect(() => {
    const include = mailname.includes("@");
    if (
      (lastname.length > 0) &
      (mailname.length > 0) &
      (firstname.length > 0) &
      include
    ) {
      setFormValid(true);
      setFormTouched(true);
    }
    if (lastname.length < 1 || mailname.length < 1 || firstname.length < 0 || !include  ) {
        setFormValid(false)
        setFormTouched(false)
    }
  }, [lastname, mailname, firstname, formSent]);

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div
          className={`form-control ${
            !formValid & (individualValid.firstname === true) ? "invalid" : ""
          }`}
        >
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            value={firstname}
            id="firstname"
            onChange={changeHandler}
            onBlur={blur}
          />
        </div>
        <div
          className={`form-control ${
            !formValid & (individualValid.lastname === true) ? "invalid" : ""
          }`}
        >
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            onChange={changeHandler}
            onBlur={blur}
            value={lastname}
          />
        </div>
      </div>
      <div
        className={`form-control ${
          !formValid & (individualValid.mailname === true) ? "invalid" : ""
        }`}
      >
        <label htmlFor="mailname">E-Mail Address</label>
        <input
          type="text"
          id="mailname"
          value={mailname}
          onChange={changeHandler}
          onBlur={blur}
        />
      </div>
      {!formValid & formTouched ? (
        <p className="error-text">
          Error occured. Please make sure you have entered valid.
        </p>
      ) : (
        ""
      )}
      <div className="form-actions">
        <button disabled={!formValid} className={!formValid ? "disabled" : ""}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
