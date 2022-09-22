import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAllTransactions, useAllUsers} from './queries';

const Transactions = () => {
  const transactions = useAllTransactions();
  const users = useAllUsers();

  return (
    <SafeAreaView>
      <View>
        <Text>All Transactions</Text>
        <Text>{JSON.stringify(transactions?.error)}</Text>
        <Text>{JSON.stringify(transactions?.data)}</Text>
        <Text>{JSON.stringify(users?.error)}</Text>
        <Text>{JSON.stringify(users?.data)}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Transactions;
