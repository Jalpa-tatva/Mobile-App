import React from 'react';
import { render, fireEvent,waitFor } from '@testing-library/react-native';
import {LoginScreen} from '../LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act } from 'react-test-renderer';
import * as Authapi from '@services/api/auth';
import { BackHandler } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

describe('LoginScreen', () => {
  const mockAsyncStorage = jest.spyOn(AsyncStorage, 'setItem')
  const mockcheckAuthorization = jest.spyOn(Authapi, 'checkAuthorization')
  const mocksaveDeviceToken = jest.spyOn(Authapi, 'saveDeviceToken')
  const mockInappbrowser = jest.spyOn(InAppBrowser, 'isAvailable')
    beforeEach(()=>{
      mockcheckAuthorization.mockClear()
      mocksaveDeviceToken.mockClear()
    })
  test('Login Sucess', async () => {
    mockcheckAuthorization.mockResolvedValue({data:[{objectList:[{userName:'abc',userUniqueId:789798}]}]})
    mocksaveDeviceToken.mockResolvedValue({data:[{objectList:[{userName:'abc',userUniqueId:789798}]}]})
    const { getByTestId } = render(<LoginScreen />);
    const usernameInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const loginButton = getByTestId('login');
    const forgotPassword = getByTestId('forgotPassword');
    mockInappbrowser.mockResolvedValue(true);
    BackHandler.mockPressBack();
    await act(()=>{
      fireEvent.changeText(usernameInput, "bhoomi.thakkar@tatvasoft.com");
      fireEvent.changeText(passwordInput, "111");
      fireEvent(passwordInput, 'onSubmitEditing');
      fireEvent(passwordInput,'validation');
      fireEvent(loginButton, 'submit',{email:'bhoomi.thakkar@tatvasoft.com',password:'111'});  
      fireEvent.press(forgotPassword); 
       
    })
    await waitFor(()=>{
      expect(mockAsyncStorage).toBeCalled();
      
    })
  });

  test('Login Fail', async () => {
    mockcheckAuthorization.mockResolvedValue({})
    mocksaveDeviceToken.mockResolvedValue({})
    const { getByTestId } = render(<LoginScreen />);
    const usernameInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const loginButton = getByTestId('login');
    const forgotPassword = getByTestId('forgotPassword');
    mockInappbrowser.mockRejectedValueOnce(false);
    BackHandler.mockPressBack();
    
    await act(()=>{
      
      fireEvent.changeText(usernameInput, "bhoomi.thakkar@tatvasoft.com");
      fireEvent.changeText(passwordInput, "11100");
      fireEvent(loginButton, 'submit',{email:'bhoomi.thakkar@tatvasoft.com',password:'000'});  
      fireEvent.press(forgotPassword);    
    })
    await waitFor(()=>{
      expect(mockAsyncStorage).toBeCalled();
      
    })
  })
});
