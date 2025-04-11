import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Fragment, useEffect, useState } from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getBalance, getRecentTransaction } from '../features/wallet/walletAction';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import ActionButton from '~/components/ActionButton';
import { Balance, TransactionListType, UserProfile } from '~/types';
import { AppDispatch } from '~/store';
import moment from 'moment';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [viewBalance, setViewBalance] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<any>>();
  const initialLoaded = useSelector((state: { wallet: { initialLoaded: boolean } }) => state.wallet.initialLoaded);
  const balance = useSelector((state: { wallet: { balance: Balance } }) => state.wallet.balance);
  const profile = useSelector((state: { auth: { profile: UserProfile } }) => state.auth.profile);
  const recentTransactions = useSelector((state: { wallet: { recentTransaction: TransactionListType } }) => state.wallet.recentTransaction);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = (): void => {
    setRefreshing(true);

    Promise.all([
      dispatch(getBalance()),
      dispatch(getRecentTransaction()),
    ])
      .finally(() => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    if (!initialLoaded) {
      dispatch(getBalance());
      dispatch(getRecentTransaction());
    }
  }, [initialLoaded]);

  return (
    <View className={styles.screen}>
      <View className={styles.header}>
        {profile.name && (
          <View className={styles.profileIcon}>
            <Text className={styles.profileInitial}>
              {profile.name[0]}
            </Text>
          </View>
        )}
        <View>
          <Text className={styles.greetingText}>Hello,</Text>
          <Text className={styles.profileName}>{profile.name}</Text>
        </View>
      </View>
      <ScrollView
        className={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className={styles.balanceContainer}>
          {balance.loading ? (
            <Placeholder Animation={Fade} >
              <PlaceholderLine />
              <PlaceholderLine />
              <PlaceholderLine width={50} />
            </Placeholder>
          ) : (
            <>
              <Text className={styles.title}>Total Balance</Text>
              <View className={styles.amountContainer}>
                <Text className={styles.balanceText}>
                  {balance.currency} {viewBalance ? balance.amount.toFixed(2) : '*'.repeat(5)}
                </Text>
                <MaterialCommunityIcons
                  name={viewBalance ? 'eye' : 'eye-off'}
                  size={24}
                  color="white"
                  onPress={() => setViewBalance(!viewBalance)}
                />
              </View>
            </>
          )}
        </View>
        <View className={styles.actionContainer}>
          <View className={styles.actionRow}>
            <View className={styles.flex1}>
              <ActionButton
                color="#dae5ff"
                icon={<MaterialCommunityIcons name="line-scan" size={24} color="#2773ff" />}
              >
                <Text className={styles.buttonText}>Scan</Text>
              </ActionButton>
            </View>
            <View className={styles.flex1}>
              <ActionButton
                color="#dae5ff"
                icon={<MaterialIcons name="add-circle-outline" size={24} color="#2773ff" />}
              >
                <Text className={styles.buttonText}>Add</Text>
              </ActionButton>
            </View>
          </View>
          <View className={styles.actionRow}>
            <View className={styles.flex1}>
              <ActionButton
                color="#dae5ff"
                icon={
                  <MaterialCommunityIcons
                    name="arrow-bottom-left-thin"
                    size={24}
                    color="#2773ff"
                  />
                }
              >
                <Text className={styles.buttonText}>Receive</Text>
              </ActionButton>
            </View>
            <View className={styles.flex1}>
              <ActionButton
                color="#dae5ff"
                icon={
                  <MaterialCommunityIcons
                    name="arrow-top-right-thin"
                    size={24}
                    color="#2773ff"
                  />
                }
                action={() => navigation.navigate('RecipientSelection')}
              >
                <Text className={styles.buttonText}>Send</Text>
              </ActionButton>
            </View>
          </View>
        </View>
        <View className={styles.transactionHistoryContainer}>
          <View className={styles.transactionHeader}>
            <Text className={styles.transactionTitle}>Transaction History</Text>
            <Text className={styles.seeAllText}>See all</Text>
          </View>
          <View className={styles.transactionList}>
            {recentTransactions.loading ? (
              <Placeholder Animation={Fade}>
                <PlaceholderLine width={80} />
                <PlaceholderLine />
                <PlaceholderLine width={50} />
              </Placeholder>
            ) : (
              <View>
                {recentTransactions.list.map((item, index: number) => (
                  <Fragment key={index}>
                    <View className={styles.transactionItem}>
                      <View className={styles.transactionIcon}>
                        {item.action === "send" ? (
                          <Feather name="send" size={20} color="white" />
                        ) : item.action === "receive" ? (
                          <MaterialCommunityIcons name="call-received" size={20} color="white" />
                        ) : item.action === "payment" ? (
                          <MaterialIcons name="payment" size={20} color="white" />
                        ) : (
                          <MaterialIcons name="add" size={20} color="white" />
                        )}
                      </View>
                      <View className={styles.transactionDetails}>
                        <Text className={styles.transactionDescription}>{item.description}</Text>
                        <Text className={styles.transactionDate}>
                          {moment.utc(item.createdAt).local().format('DD MMM YYYY, HH:mm')}
                        </Text>
                      </View>
                      <View className={styles.transactionAmountContainer}>
                        <Text className={item.type === "credit" ? styles.creditAmount : styles.debitAmount}>
                          {item.type === "credit" ? "-" : "+"}{item.currency} {item.amount.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                    {index != recentTransactions.list.length - 1 && (
                      <View className={styles.divider} />
                    )}
                  </Fragment>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  screen: "flex-1",
  container: "p-5",
  header: "pt-5 pb-3 px-5 gap-3 flex-row items-center",
  profileIcon: "rounded-full bg-blue-600 w-10 h-10 flex-row items-center justify-center",
  profileInitial: "text-lg text-white font-bold",
  greetingText: "text-lg",
  profileName: "text-lg font-bold",
  balanceContainer: "bg-blue-500 rounded-lg px-6 py-8 w-full",
  title: "text-white text-2xl",
  amountContainer: "flex-row mt-5 items-center",
  balanceText: "mr-2 text-4xl text-white font-bold",
  actionContainer: "mt-2",
  actionRow: "flex-wrap flex-row gap-2 mt-4",
  flex1: "flex-1",
  buttonText: "text-lg flex-1 text-center",
  transactionHistoryContainer: "mt-8",
  transactionHeader: "flex-row justify-between w-full items-end",
  transactionTitle: "text-lg",
  seeAllText: "text-sm underline text-gray-500",
  transactionList: "bg-white p-3 mt-2 rounded-lg",
  transactionItem: "flex-row py-3 gap-3",
  transactionIcon: "bg-blue-900 justify-center items-center rounded-full w-9 h-9",
  transactionDetails: "flex-1",
  transactionDescription: "text-lg",
  transactionDate: "text-sm text-gray-400",
  transactionAmountContainer: "items-end",
  creditAmount: "text-red-500",
  debitAmount: "text-green-500",
  divider: "h-px bg-gray-300 my-2 w-full",
};

export default HomeScreen;