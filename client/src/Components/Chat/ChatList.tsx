import { io } from 'socket.io-client';
import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import Chat from './Chat';
import PendingClientList from './PendingClientList';
import ApplicantList from './ApplicantList';
import AcceptedApplicantList from './AcceptedApplicantList';
import ConfirmedClientList from './ConfirmedClientList';
import '../../css/App.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeView, getUsersOnline } from '../../state/features/chat/chatSlice';
import { Container, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

interface userOnline {
  userId: number,
  name: string,
  socketId: string
}

const ChatList = ({ socket }) => {
  const currUser = useAppSelector((state) => state.userProfile.value);
  const usersOnline = useAppSelector((state) => state.chat.usersOnline);
  const dispatch = useAppDispatch();

  const view = useAppSelector((state) => state.chat.view);

  useEffect(() => {

    if (socket.id !== undefined) {
      socket.emit('addUser', {
        userId: currUser.id,
        name: currUser.name
      }); 
    }

    socket.on('getUsers', (onlineUsers: userOnline[]) => {
      dispatch(getUsersOnline(onlineUsers));
    });

  }, [socket.id, usersOnline]);

  return (
    <Container>
      <DropdownButton as={ButtonGroup} title={view}>
        <Dropdown.Item onClick={(event) => dispatch(changeView(event.target.textContent))} eventKey="1">All</Dropdown.Item>
        <Dropdown.Item onClick={(event) => dispatch(changeView(event.target.textContent))} eventKey="2">Pending Employers</Dropdown.Item>
        <Dropdown.Item onClick={(event) => dispatch(changeView(event.target.textContent))} eventKey="3">Confirmed Employers</Dropdown.Item>
        <Dropdown.Item onClick={(event) => dispatch(changeView(event.target.textContent))} eventKey="4">Applicants</Dropdown.Item>
        <Dropdown.Item onClick={(event) => dispatch(changeView(event.target.textContent))} eventKey="5">Accepted Applicants</Dropdown.Item>
      </DropdownButton>
      {view === 'All' ? (
        <div>
          <PendingClientList />
          <ConfirmedClientList />
          <ApplicantList />
          <AcceptedApplicantList />
        </div>
      )
        : (
          view === 'Pending Employers' ? (
            <div>
              <PendingClientList />
            </div>
          )
            : (
              view === 'Confirmed Employers' ? (
                <div>
                  <ConfirmedClientList />
                </div>
              )
                : (
                  view === 'Applicants' ? (
                    <div>
                      <ApplicantList />
                    </div>
                  )
                    : (
                      view === 'Accepted Applicants' ? (
                        <div>
                          <AcceptedApplicantList />
                        </div>
                      )
                        : (
                          <div>
                            {view === 'Chat' && <Chat socket={socket} />}
                          </div>
                        )
                    )
                )
            )
        )
      }
    </Container>
  );
};

export default ChatList;