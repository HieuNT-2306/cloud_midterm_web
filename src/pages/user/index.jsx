import React, { useState } from 'react'
import { Box, InputAdornment, Table, TableBody, TableCell, TableRow, Toolbar, Typography } from '@mui/material'
import { useDeleteUserMutation, useGetUserQuery, usePostUserMutation } from '../../state/api'
import { Add, Delete, Edit, Search } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Usetable from '../../components/Usetable'
import CustomInput from '../../components/controls/CustomInput'
import CustomButton from '../../components/controls/CustomButton'
import Popup from '../../components/Popup'
import Notification from '../../components/Notification'
import ConfirmDialog from '../../components/ConfirmDialog'
import UserForm from './userForm'
import { useSelector } from 'react-redux';
import { selectUser, clearUser } from '../../state/userSlice';


const headCell = [
  { id: 'name', label: 'Họ và tên', width: '20%', align: 'left' },
  { id: 'gender', label: 'Giới tính', width: '20%', align: 'left' },
  { id: 'school', label: 'Trường theo học', width: '20%', align: 'left' },
  { id: 'actions', label: 'Thao tác', disableSorting: true, width: '20%', align: 'center' },
]

const User = () => {
  const { data } = useGetUserQuery();
  const [dataForEdit, setDataForEdit] = useState(null);
  const [createUser, { isLoading: isCreating }] = usePostUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    TblContainer,
    TblHead,
    TblPagination,
    dataAfterPagingAndSorting
  } = Usetable(data, headCell, filterFn);

  const handleSearch = (e) => {
    const target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value === "")
          return items;
        else
          return items.filter(x => x.name.toLowerCase().includes(target.value))
      }
    })
  }
  const addOrEdit = (user, resetForm) => {
    createUser(user);
    resetForm();
    setOpenPopup(false);
    if (user._id) {
      setNotify({
        isOpen: true,
        message: `Sửa thông tin của ${user.name} thành công`,
        type: 'success'
      });
    }
    else {
      setNotify({
        isOpen: true,
        message: `Thêm thành công thực tập sinh ${user.name}`,
        type: 'success'
      });
    }
  }

  const openInPopup = (user) => {
    setDataForEdit(user);
    setOpenPopup(true);
  }

  const onDelete = async (user) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    try {
      await deleteUser(user._id).unwrap();
      setNotify({
        isOpen: true,
        message: `Xóa thành công thực tập sinh ${user.name}`,
        type: 'error'
      });
    } catch (error) {
      if (error.status === 409) {
        setNotify({
          isOpen: true,
          message: 'Bạn đã vượt quá giới hạn 10 yêu cầu/phút, xin vui lòng thử lại sau.',
          type: 'error'
        });
      } else {
        setNotify({
          isOpen: true,
          message: `Đã xảy ra lỗi: ${error.data.message}`,
          type: 'error'
        });
      }
    }
  };
  
  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    dispatch(clearUser());
    navigate('/login');
  }

  const genderMap = {
    "male": "Nam",
    "female": "Nữ",
    "other": "Khác"
  }


  return (
    <Box m="0.5rem 1.5rem">
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <Typography variant='h6' fontWeight='600'>
          Trang web quản lý thực tập sinh cơ bản
        </Typography>
        <Typography variant='h6' fontWeight='600'>
          Xin chào {user.role}: {user.name}
        </Typography>

      </Box>
      <Box
        margin={1}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none"
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#f5f5f5",
            color: "#000",
            fontWeight: 600
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <CustomInput
            label="Tìm kiếm"
            sx={{ width: '55%' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }}
            onChange={handleSearch}
          />
          <CustomButton
            text="Thêm mới"
            startIcon={<Add />}
            sx={{ width: '10%', fontSize: '0.8rem' }}
            onClick={() => { setOpenPopup(true); setDataForEdit(null); }}
            disabled={user.role === 'user'}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {
              data && dataAfterPagingAndSorting(true).map(item =>
              (<TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{genderMap[item.gender]}</TableCell>
                <TableCell>{item.school}</TableCell>
                <TableCell align='center'>
                  <CustomButton
                    text="Sửa"
                    startIcon={<Edit />}
                    sx={{ width: '10%', fontSize: '0.8rem', marginRight: '0.5rem' }}
                    onClick={() => openInPopup(item)}
                    disabled={user.role === 'user'}
                  />
                  <CustomButton
                    text="Xóa"
                    startIcon={<Delete />}
                    sx={{ width: '10%', fontSize: '0.8rem' }}
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: `Bạn có chắc chắn muốn xóa sinh viên ${item.name}?`,
                        subTitle: 'Lưu ý, bạn không thể hoàn tác hành động này!',
                        onConfirm: () => { onDelete(item) }
                      })
                    }}
                    disabled={user.role === 'user'}
                  />
                </TableCell>
              </TableRow>)
              )
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
        {
          user.role === 'user' ? (
            <Typography fontWeight='500' color='gray' fontStyle='italic'>
              Lưu ý, bạn không có quyền thực hiện các thao tác sau:<br />
              - Thêm thông tin sinh viên mới. <br />
              - Chỉnh sửa thông tin sinh viên. <br />
              - Xóa thông tin sinh viên.
            </Typography>
          ) : null
        }
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <CustomButton
            text="Đăng xuất"
            sx={{ width: '10%', fontSize: '0.8rem'}}
            onClick={handleLogout}
          />
        </Box>
        <Popup
          title="Thêm / sửa thông tin thực tập sinh"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <UserForm
            dataForEdit={dataForEdit}
            addOrEdit={addOrEdit}
          />
        </Popup>
        <Notification
          notify={notify}
          setNotify={setNotify}
        />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Box>
    </Box>
  )
}

export default User
