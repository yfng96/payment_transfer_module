import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RecipientInfo } from '~/types';

function RecipientList({
  list,
  onSelect,
}: {
  list: RecipientInfo[];
  onSelect: (item: RecipientInfo) => void;
}) {
  return (
    <FlatList
      data={list}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({
        item,
        index,
      }: {
        item: RecipientInfo;
        index: number;
      }) => (
        <View key={index} className={styles.cardContainer}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => onSelect(item)} className={styles.buttonContainer}>
            {item.type === 1 ? (
              <MaterialCommunityIcons name='bank' size={30} />
            ) : (
              <MaterialCommunityIcons name='cellphone' size={30} />
            )}
            <View className='ml-4'>
              <Text className='text-lg'>{item.name}</Text>
              <Text className='text-sm'>
                {item.type === 1 ? item.bankName : 'Mobile Number'}
              </Text>
              <Text className='text-[18px] mt-1'>{item.accountNo}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = {
  cardContainer:
    'flex flex-row items-center bg-white p-4 my-1.5 rounded-lg shadow-sm shadow-gray-400 mx-5',
  buttonContainer: 'flex flex-row items-center w-full'
};

export default RecipientList;
