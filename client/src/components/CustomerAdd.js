import React, { useState } from "react";
import { post } from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  hidden: {
    display: "none"
  }
}));

export default function CustomerAdd(props) {
  const classes = styles();

  const initialDataState = {
    file: null,
    name: "",
    birth: "",
    gender: "",
    job: "",
    fileName: ""
  };

  const [data, setValue] = useState(initialDataState);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValue({
      file: null,
      name: "",
      birth: "",
      gender: "",
      job: "",
      fileName: ""
    });
  };
  function handleValueChange(e) {
    e.preventDefault();

    setValue({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  function handleFileChange(e) {
    setValue({
      ...data,
      file: e.target.files[0],
      fileName: e.target.value
    });
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(data.name, data.birth, data.job, data.gender);
    addCustomer().then(response => {
      console.log(response.data);
      props.refreshState();
    });
    setValue({
      file: null,
      name: "",
      birth: "",
      gender: "",
      job: "",
      fileName: ""
    });
    setOpen(false);
  }

  function addCustomer() {
    const url = "api/customers";
    const formData = new FormData();
    formData.append("image", data.file);
    formData.append("name", data.name);
    formData.append("birth", data.birth);
    formData.append("gender", data.gender);
    formData.append("job", data.job);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config);
  }
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        고객 추가하기
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>고객 추가</DialogTitle>
        <DialogContent>
          <input
            className={classes.hidden}
            accept="image/*"
            id="raised-button-file"
            type="file"
            file={data.file}
            value={data.fileName}
            onChange={handleFileChange}
          />
          <br />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              name="file"
            >
              {data.fileName === "" ? "프로필 이미지 선택" : data.fileName}
            </Button>
          </label>
          <br />
          <TextField
            label="이름"
            type="text"
            name="name"
            value={data.name}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="생일"
            type="text"
            name="birth"
            value={data.birth}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="성별"
            type="text"
            name="gender"
            value={data.gender}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="직업"
            type="text"
            name="job"
            value={data.job}
            onChange={handleValueChange}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            추가
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
