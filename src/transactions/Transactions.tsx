import React from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {invalidateAccessToken} from '../auth/actions';
import {useAllTransactions, useAllUsers} from './queries';
import {useTxSubscription} from './subscriptions';

const Transactions = () => {
  const dispatch = useDispatch();
  const subbedTx = useTxSubscription();
  const transactions = useAllTransactions();
  const users = useAllUsers();

  const handleInvalidate = () => {
    dispatch(invalidateAccessToken());
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={handleInvalidate}>
        <Button title="Invalidate Token" />
      </TouchableOpacity>
      <ScrollView>
        <Text style={styles.header}>Subcriptions</Text>
        <ScrollView style={styles.box}>
          <Text>{JSON.stringify(subbedTx.data)}</Text>
        </ScrollView>
        <Text style={styles.header}>All Transactions</Text>
        <Text>{JSON.stringify(transactions?.error)}</Text>
        <ScrollView style={styles.box}>
          <Text>{JSON.stringify(transactions?.data)}</Text>
        </ScrollView>
        <Text style={styles.header}>All Transactions</Text>
        <Text>{JSON.stringify(users?.error)}</Text>
        <ScrollView style={styles.box}>
          <Text>{JSON.stringify(users?.data)}</Text>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
  },
  box: {
    maxHeight: 300,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default Transactions;
