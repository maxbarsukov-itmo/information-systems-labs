import React, { useState } from 'react';
import { GiQueenCrown } from 'react-icons/gi';
import dayjs from 'dayjs';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import { makeStyles, Typography } from '@material-ui/core';

import User from 'interfaces/models/User';
import UserAvatar from 'components/blocks/UserAvatar';
import { Role } from 'interfaces/models/Role';

const ICON_SIZE = 30;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing(1.5, 0),
  },
  id: {
    display: 'flex',
    flexGrow: 1,
    marginRight: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  admin: {
    fontWeight: 800,
    color: '#dacc0f',
  },
  avatar: {
    display: 'flex',
    flexGrow: 1,
    marginRight: theme.spacing(2),
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: theme.shape.borderRadius,
  },
}));

export const renderDateTime = (params: GridRenderCellParams) => {
  if (!params.value) return;
  return (
    <span>{dayjs(new Date(params.value.toString())).calendar().toLowerCase()}</span>
  );
};

export const renderUser = (params: GridRenderCellParams) => {
  const user: User = params.value as User;
  if (!user) return;

  const classes = useStyles();

  return (
    <span className={classes.root}>
      {user.role === Role.ROLE_ADMIN
        ? <GiQueenCrown size={ICON_SIZE} color={'#dacc0f'} className={classes.avatar}/>
        : <UserAvatar src='' username={user.username} className={classes.avatar}/>
      }
      <span className={classes.id}>#{user.id}</span>
      <span className={user.role === Role.ROLE_ADMIN ? classes.admin : ''}>{user.username}</span>
    </span>
  );
};

export const renderStatus = (params: GridRenderCellParams) => {
  const text = params.value as string;
  if (!text) return;

  const base = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px',
    padding: '1px',
    fontWeight: 500,
    borderRadius: '10px',
    width: '70px',
    height: '30px',
  };

  const progress = {
    backgroundColor: '#ecc800',
    color: '#e9e9e9',
    ...base,
  };

  const success = {
    backgroundColor: '#4caf50',
    color: '#e9e9e9',
    ...base,
  };

  const failed = {
    backgroundColor: '#ab230e',
    color: '#e9e9e9',
    ...base,
  };

  const values = {
    'SUCCESS': success,
    'FAILED': failed,
    'IN_PROGRESS': progress,
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={values[text]}>
        {text}
      </div>
    </div>
  );
};

const splitString = (input: string, lineLength: number): string => {
  const result: string[] = [];

  for (let i = 0; i < input.length; i += lineLength) {
      result.push(input.substring(i, i + lineLength));
  }

  return result.join('<br>');
};


export const renderMultilineText = (params: GridRenderCellParams) => {
  const text = params.value as string;
  if (!text) return;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography style={{ wordBreak: 'break-all' }}
            dangerouslySetInnerHTML={{
              __html: splitString(text, 20),
            }}
      />
    </div>
  );
};
