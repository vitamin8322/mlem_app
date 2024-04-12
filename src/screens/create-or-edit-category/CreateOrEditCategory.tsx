import {
  createCategory,
  deleteCategory,
  editCategory,
} from '@services/apis/category.api';
import {
  LIST_CATEGORY,
  LIST_COLOR_CATEGORY,
  REACT_QUERY_KEY,
} from '@shared-constants';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import classNames from 'classnames';
import {useTheme} from 'contexts/app.context';
import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useToastNotifications from 'shared/hooks/useToastNotifications';
import LayoutBase from 'shared/layout';
import {useToast} from 'react-native-toast-notifications';
import {goBack} from 'react-navigation-helpers';

const CreateOrEditCategory = ({navigation, route}: any) => {
  const {params} = route;
  const {theme} = useTheme();
  const {t, i18n} = useTranslation('home');
  const queryClient = useQueryClient();
  // console.log(params);
  const showToast = useToastNotifications();

  const [formCategory, setFormCategory] = useState<{
    name: string;
    icon: string;
    fill: string;
    type: string;
  }>({
    name: params?.item?.name ?? '',
    icon: params?.item?.icon ?? 'Invest',
    fill: params?.item?.fill ?? 'f5b342',
    type: params.page === 0 ? 'exp' : 'rev',
  });

  const categoryMutation = useMutation({
    mutationFn: createCategory,
  });

  const editCategoryMutation = useMutation({
    mutationFn: editCategory,
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
  });

  const handleFormCategory = () => {
    if (!params.edit) {
      // console.log(params.id);
      categoryMutation.mutate(formCategory, {
        onSuccess(response) {
          console.log('create', response.data.data);
          queryClient.invalidateQueries({
            queryKey: [REACT_QUERY_KEY.ALL_CATEGORY],
          });
        showToast('Create successfully', 'success', 'top');
        goBack();
        },
      });
    } else {
      editCategoryMutation.mutate(
        {...formCategory, id: params.item._id},
        {
          onSuccess(response) {
            console.log('edit', response.data.data);
            queryClient.invalidateQueries({
              queryKey: [REACT_QUERY_KEY.ALL_CATEGORY],
            });
            showToast('Edit successfully', 'success', 'top');
            goBack();
          },
        },
      );
    }
  };
  const toast = useToast();

  const handleDeleteCategory = (id: string) => {
    deleteCategoryMutation.mutate(id, {
      onSuccess(response) {
        console.log(response);

        queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEY.ALL_CATEGORY],
        });
        showToast('Delete successfully', 'success', 'top');
        goBack();
      },
    });
  };

  return (
    <LayoutBase
      name={`${!params.edit ? t('addWallet') : t('editWallet')}`}
      isDelete={params.edit}
      funcDelete={() => handleDeleteCategory(params.item._id)}>
      <View className={'h-full px-5'}>
        <View className="flex flex-row justify-center items-center h-[10%] ">
          <View className="w-2/12">
            <Text style={{color: theme.textColor}}>{t('name')}</Text>
          </View>
          <View className="w-10/12">
            <TextInput
              style={{color: theme.textColor, borderColor: theme.textColor}}
              className="w-full border border-slate-200 rounded-md h-12 px-2 text-[18px] font-semibold"
              value={formCategory.name}
              onChangeText={text => {
                setFormCategory(prevState => ({
                  ...prevState,
                  name: text,
                }));
              }}
            />
          </View>
        </View>
        <View className={'h-[35%] border-b-2'}>
          <Text>Biểu tượng</Text>
          <ScrollView>
            <View className={'flex flex-row items-center'}>
              <View className="flex flex-row justify-between items-center ">
                <FlatList
                  data={Object.values(LIST_CATEGORY)}
                  numColumns={5}
                  keyExtractor={(item, index) => item.name}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => {
                        setFormCategory(prevState => ({
                          ...prevState,
                          icon: item.name,
                        }));
                      }}>
                      <View
                        className={classNames(
                          'flex flex-row justify-between items-center p-1 border m-2 rounded-lg',
                          {
                            'border-2': formCategory.icon === item.name,
                          },
                        )}>
                        {React.createElement(item.icon, {
                          height: 40,
                          width: 40,
                          fill: 'blue',
                        })}
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View className={'h-[35%] '}>
          <Text>Màu sắc</Text>
          <ScrollView>
            <View className={'flex flex-row items-center'}>
              <View className="flex flex-row justify-between items-center ">
                <FlatList
                  data={Object.values(LIST_COLOR_CATEGORY)}
                  numColumns={4}
                  keyExtractor={item => 'item.id'}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setFormCategory(prevState => ({
                            ...prevState,
                            fill: item,
                          }));
                        }}>
                        <View
                          className={classNames(
                            'flex flex-row justify-between items-center p-1 border m-2 h-10 bg-white rounded-lg',
                            {
                              'border-2': formCategory.fill === item,
                            },
                          )}>
                          <View
                            style={{backgroundColor: `#${item}`}}
                            className={`h-[100%] w-14 bg-[#${item}]`}></View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View className={'h-[10%]'}>
          <TouchableOpacity
            // disabled={valueMoney === '0'}
            className={classNames('bg-slate-300 mx-4 h-10 rounded-md', {
              'bg-green-600': formCategory.name,
            })}
            onPress={handleFormCategory}>
            <Text
              className={classNames(
                'text-center h-10 mt-2 font-semibold text-[18px]',
                {
                  // 'text-white': valueMoney !== '0',
                },
              )}>
              Lưu
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LayoutBase>
  );
};

export default CreateOrEditCategory;
