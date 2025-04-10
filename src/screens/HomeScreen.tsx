import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type CategoryType = 'Drink' | 'Market' | 'Transfer';

type Transaction = {
  category: CategoryType;
  amount: number;
  type: 'in' | 'out';
  remark: string;
};

type Categories = Record<CategoryType, { icon: string; color: string }>;

const HomeScreen: React.FC = () => {
  const [viewBalance, setViewBalance] = useState<boolean>(false);
  const balance: number = 50000000;
  const navigation = useNavigation<NavigationProp<any>>();

  const history: Transaction[] = [
    {
      category: 'Drink',
      amount: 10,
      type: 'in',
      remark: 'Starbucks',
    },
    {
      category: 'Market',
      amount: 10,
      type: 'in',
      remark: 'groceries',
    },
    {
      category: 'Transfer',
      amount: 10,
      type: 'out',
      remark: 'John Smith',
    },
  ];

  const categories: Categories = {
    Drink: {
      icon: 'cup',
      color: '#f2bcff',
    },
    Market: {
      icon: 'cart',
      color: '#ffea83',
    },
    Transfer: {
      icon: 'arrow-right',
      color: '#ffaaaa',
    },
  };

  return (
    <View className={styles.screen}>
      <ScrollView className={styles.container}>
        <View className={styles.balanceContainer}>
          <Text className={styles.title}>Balance</Text>
          <View className={styles.amountContainer}>
            <Text className={styles.balanceText}>
              RM {viewBalance ? balance : '*'.repeat(balance.toString().length)}
            </Text>
            <MaterialCommunityIcons
              name={viewBalance ? 'eye' : 'eye-off'}
              size={24}
              color="white"
              onPress={() => setViewBalance(!viewBalance)}
            />
          </View>
        </View>
        <View className={styles.actionRow}>
          <View className={styles.button}>
            <MaterialIcons name="add-circle-outline" size={24} color="#2773ff" />
            <Text className={styles.buttonText}>Add Money</Text>
          </View>
          <View className={styles.button} onTouchEnd={() => navigation.navigate('Transfer')}>
            <MaterialIcons name="send" size={24} color="#2773ff" />
            <Text className={styles.buttonText}>Send Money</Text>
          </View>
        </View>
        <View className={styles.transactionHistoryContainer}>
          <View className={styles.transactionHeader}>
            <Text className={styles.transactionTitle}>Transaction History</Text>
            <Text className={styles.seeAllText}>See all</Text>
          </View>
          <View className={styles.transactionList}>
            {history.map((item, index) => (
              <View key={index}>
                <View className={styles.transactionItem}>
                  <View className={styles.transactionDetails}>
                    <View
                      className={styles.transactionIconContainer}
                      style={{ backgroundColor: categories[item.category]?.color }}>
                      <MaterialCommunityIcons
                        name={
                          (categories[item.category]
                            ?.icon as keyof typeof MaterialCommunityIcons.glyphMap) || 'circle'
                        }
                        size={20}
                        color="black"
                      />
                    </View>
                    <View>
                      <Text className={styles.transactionCategory}>{item.category}</Text>
                      <Text className={styles.transactionRemark}>{item.remark}</Text>
                    </View>
                  </View>
                  <Text
                    className={styles.transactionAmount}
                    style={{ color: item.type === 'in' ? '#4caf50' : '#f44336' }}>
                    RM {item.amount}
                  </Text>
                </View>
                {index !== history.length - 1 && <View className={styles.divider} />}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  screen: 'flex-1 bg-white',
  container: 'p-5 bg-white',
  balanceContainer: 'bg-[#3b82f6] rounded-lg p-6 w-full',
  title: 'text-white text-2xl',
  amountContainer: 'flex-row mt-2 items-center',
  balanceText: 'mr-2 text-4xl font-bold text-white',
  actionRow: 'flex-row gap-2 mt-5',
  button: 'bg-[#e3ebff] rounded-xl p-2 items-center flex-1 text-xl flex-row justify-center gap-2',
  buttonText: 'text-xl flex-1 text-center',
  transactionHistoryContainer: 'mt-7',
  transactionHeader: 'flex-row justify-between w-full items-end',
  transactionTitle: 'text-lg',
  seeAllText: 'text-sm underline text-[#919191]',
  transactionList: 'mt-2',
  transactionItem: 'flex-row justify-between mt-2 items-center',
  transactionDetails: 'flex-row items-center',
  transactionIconContainer: 'rounded-full p-1',
  transactionCategory: 'ml-2 text-lg',
  transactionRemark: 'ml-2 text-sm',
  transactionAmount: 'text-base',
  divider: 'h-[1px] bg-[#e0e0e0] my-2 w-full',
};

export default HomeScreen;