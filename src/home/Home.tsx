import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PhoneInput from 'react-native-phone-number-input';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Button, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setE146PhoneNumber} from '../app/actions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAuth0} from '../auth/useAuth';

const Home = () => {
  const dispatch = useDispatch();
  const {sendText, verifyText} = useAuth0();
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handlePhoneNumber = (text: string) => {
    setPhoneNumber(text);
  };

  const submitPhoneNumber = () => {
    dispatch(setE146PhoneNumber(phoneNumber));
    sendText(phoneNumber);
    console.log('Phone', phoneNumber);
  };

  const handleOTPCode = (code: string) => {
    console.log('OTP', code);
    verifyText(phoneNumber, code).then(console.log).catch(console.error);
  };

  return (
    <SafeAreaView>
      <View style={styles.phoneContainer}>
        <PhoneInput
          containerStyle={styles.phoneInputStyle}
          onChangeFormattedText={handlePhoneNumber}
        />
      </View>
      <TouchableOpacity onPress={submitPhoneNumber}>
        <Button title={'Submit Phone Number'} />
      </TouchableOpacity>
      <OTPInputView
        style={styles.otpContainer}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={handleOTPCode}
        pinCount={6}
      />
      <TouchableOpacity>
        <Button title={'Verify Phone Number'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  phoneInputStyle: {
    width: '90%',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  otpContainer: {
    height: 300,
    paddingHorizontal: 30,
  },
  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  underlineStyleBase: {
    color: 'black',
    width: 30,
    height: 45,
    borderColor: '#333',
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});

export default Home;
