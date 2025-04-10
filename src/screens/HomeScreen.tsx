import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store';
import { getBalance } from './features/wallet/walletAction';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import ActionButton from '~/components/ActionButton';
import { Balance, UserProfile } from '~/types';

type CategoryType = 'Drink' | 'Market' | 'Transfer';

type Transaction = {
  category: CategoryType;
  amount: number;
  type: 'in' | 'out';
  remark: string;
};

type Categories = Record<CategoryType, { icon: string; color: string }>;

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [viewBalance, setViewBalance] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<any>>();
  const balance = useSelector((state: { wallet: { balance: Balance } }) => state.wallet.balance);
  const profile = useSelector((state: { auth: { profile: UserProfile } }) => state.auth.profile);

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

  useEffect(() => {
    dispatch(getBalance());
  }, []);

  return (
    <View className={styles.screen}>
      <View
        style={{
          paddingTop: 20,
          paddingBottom: 10,
          paddingHorizontal: 20,
          gap: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {profile.name && (
          <View
            style={{
              borderRadius: 50,
              backgroundColor: '#2773ff',
              width: 40,
              height: 40,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
              {profile.name[0]}
            </Text>
          </View>
        )}
        <View>
          <Text style={{ fontSize: 16 }}>Hello,</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{profile.name}</Text>
        </View>
      </View>
      <ScrollView className={styles.container}>
        <View className={styles.balanceContainer}>
          {balance.loading ? (
            <Placeholder Animation={Fade}>
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
                  color='white'
                  onPress={() => setViewBalance(!viewBalance)}
                />
              </View>
            </>
          )}
        </View>
        <View className='mt-2'>
          <View className={styles.actionRow}>
            <View className='flex-1'>
              <ActionButton
                color='#e3ebff'
                icon={<MaterialCommunityIcons name='line-scan' size={24} color='#2773ff' />}
              >
                <Text className={styles.buttonText}>Scan</Text>
              </ActionButton>
            </View>
            <View className='flex-1'>
              <ActionButton
                color='#e3ebff'
                icon={<MaterialIcons name='add-circle-outline' size={24} color='#2773ff' />}
              >
                <Text className={styles.buttonText}>Add</Text>
              </ActionButton>
            </View>
          </View>
          <View className={styles.actionRow}>
            <View className='flex-1'>
              <ActionButton
                color='#e3ebff'
                icon={
                  <MaterialCommunityIcons
                    name='arrow-bottom-left-thin'
                    size={24}
                    color='#2773ff'
                  />
                }
              >
                <Text className={styles.buttonText}>Receive</Text>
              </ActionButton>
            </View>
            <View className='flex-1'>
              <ActionButton
                color='#e3ebff'
                icon={
                  <MaterialCommunityIcons
                    name='arrow-top-right-thin'
                    size={24}
                    color='#2773ff'
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
            {history.map((item, index) => (
              <View key={index}>
                <View className={styles.transactionItem}>
                  <View className={styles.transactionDetails}>
                    <View
                      className={styles.transactionIconContainer}
                      style={{ backgroundColor: categories[item.category]?.color }}
                    >
                      <MaterialCommunityIcons
                        name={
                          (categories[item.category]
                            ?.icon as keyof typeof MaterialCommunityIcons.glyphMap) || 'circle'
                        }
                        size={20}
                        color='black'
                      />
                    </View>
                    <View>
                      <Text className={styles.transactionCategory}>{item.category}</Text>
                      <Text className={styles.transactionRemark}>{item.remark}</Text>
                    </View>
                  </View>
                  <Text
                    className={styles.transactionAmount}
                    style={{ color: item.type === 'in' ? '#4caf50' : '#f44336' }}
                  >
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
  balanceContainer: 'bg-[#3b82f6] rounded-lg px-6 py-8 w-full',
  title: 'text-white text-2xl',
  amountContainer: 'flex-row mt-5 items-center',
  balanceText: 'mr-2 text-4xl text-white font-bold',
  actionRow: 'flex-wrap flex flex-row gap-2 mt-4',
  button: 'bg-[#e3ebff] rounded-xl px-2 py-4 items-center flex-1 text-xl flex-row justify-center gap-2',
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