import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SearchList from "../SearchList/searchList";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import "./searchlist.css";

export default function Search() {
  let textInput = React.createRef();
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(!localStorage.getItem('onboarding')?true:false);

  console.log(totalPages)
  console.log(page)

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("onboarding", 'false');

  };

  const getUserList = (e) => {
    e.preventDefault();
    const name = textInput.current.value;
    fetch(`https://api.github.com/search/users?q=${name}&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTotalPages(Math.round(res.total_count -30));
        setUserList([...res.items]);
        setLoading(false);
      });
  };

  const setPageControl = (page) => {
    const pageTotal = page + 1;
    setPage(pageTotal);
    const name = textInput.current.value;
    fetch(`https://api.github.com/search/users?q=${name}&page=${pageTotal}`)
      .then((res) => res.json())
      .then((res) => {
        setUserList([...userList, ...res.items]);
        setTotalPages(Math.round(totalPages - 30));
        setLoading(false);
      });
  };

  return (
    <section id="team" className="">
      <div className="container">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Welcome to my test Assement Implementation on Github's API
              <br></br>
              Language Used: Javascript<br></br>
              Libraries Used: React, Material UI<br></br>
              <span style={{ fontStyle: "italic" }}>
                Please type in a username on the searchbar to begin
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Continue
            </Button>
          </DialogActions>
        </Dialog>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            margin: "auto",
            position: "relative",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            name={textInput}
            inputRef={textInput}
            placeholder="Search Github Users"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={(e) => {
              getUserList(e);
            }}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
       <SearchList userList={userList} />

        <div className="clearfix"></div>
        {totalPages >=31 && (
          <Button
            variant="contained"
            onClick={() => setPageControl(page)}
            style={{ margin: "auto",left:"45%" ,background:"#007b5e"}}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    </section>
  );
}
