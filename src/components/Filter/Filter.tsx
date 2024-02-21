import * as React from "react";
import s from "./Filter.module.scss";
import { Button, MenuItem, Menu } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { Icon } from "common/components/icon/Icon";
import { useState, type MouseEvent, useContext } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AlignHorizontalCenterIcon from "@mui/icons-material/AlignHorizontalCenter";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import { ThemeContext } from "styled-components";
import { useSearchParams } from "react-router-dom";

export const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useContext(ThemeContext);
  const sort = searchParams.get("sort");
  const align = searchParams.get("align");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sortHandler = () => {
    if (!sort) {
      searchParams.set("sort", "asc");
    } else {
      sort === "asc" ? searchParams.set("sort", "desc") : searchParams.delete("sort");
    }
    setSearchParams(searchParams);
  };

  const alignHandler = () => {
    if (!align) {
      searchParams.set("align", "start");
    } else {
      searchParams.delete("align");
    }
    setSearchParams(searchParams);
  };

  const clearHandler = () => {
    [...searchParams.keys()].forEach(key => {
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  };

  return (
    <>
      <Button
        sx={{ color: "unset" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Icon size="M">
          <TuneIcon />
        </Icon>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            border: `4px solid ${theme.mainColor}`,
            borderRadius: "15px",
          },
        }}
        MenuListProps={{
          style: {
            color: theme.mainColor,
            backgroundColor: theme.taskBG,
            padding: 0,
          },
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem className={s.sortItem} onClick={sortHandler}>
          Sort
          {sort && (sort === "asc" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />)}
        </MenuItem>
        <MenuItem className={s.sortItem} onClick={alignHandler}>
          Align
          <Icon size="S">
            {align ? <AlignHorizontalLeftIcon /> : <AlignHorizontalCenterIcon />}
          </Icon>
        </MenuItem>
        <MenuItem className={s.sortItem} onClick={clearHandler}>
          Clear filters
        </MenuItem>
      </Menu>
    </>
  );
};
