import React, { useState } from 'react'
import { Box, InputAdornment, Table, TableBody, TableCell, TableRow, Toolbar, Typography } from '@mui/material'
import { useDeleteUserMutation, useGetUserQuery, usePostUserMutation } from '../../state/api'
import { Add, Delete, Edit, Search } from '@mui/icons-material'
import Usetable from '../../components/Usetable'
import CustomInput from '../../components/controls/CustomInput'
import CustomButton from '../../components/controls/CustomButton'
import Popup from '../../components/Popup'
import Notification from '../../components/Notification'
import ConfirmDialog from '../../components/ConfirmDialog'
import UserForm from './userForm'
import log from '../../helper/logger'
 
const headCell = [
  { id: 'name', label: 'Họ và tên', width: '20%', align: 'left'},
  { id: 'gender', label: 'Giới tính', width: '20%', align: 'left'},
  { id: 'school', label: 'Trường theo học', width: '20%', align: 'left'},
  { id: 'actions', label: 'Thao tác', disableSorting: true, width: '20%', align: 'center'},
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

  const onDelete = (user) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    deleteUser(user._id);
    setNotify({
      isOpen: true,
      message: `Xóa thành công thực tập sinh ${user.name}` ,
      type: 'error'
    });
  }
  const genderMap = {
    "male": "Nam",
    "female": "Nữ",
    "other": "Khác"
  }


  return (
    <Box m="0.5rem 1.5rem">
      <Typography variant='h6' fontWeight='600'>
        Trang web quản lý thực tập sinh cơ bản  
      </Typography>
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
            sx={{ width: '10%', fontSize: '0.8rem'}}
            onClick={() => { setOpenPopup(true); setDataForEdit(null); }}
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
                    sx={{ width: '10%', fontSize: '0.8rem', marginRight: '0.5rem'}}             
                    onClick={() => openInPopup(item)}
                  />
                  <CustomButton
                    text="Xóa"
                    startIcon={<Delete />}
                    sx={{ width: '10%', fontSize: '0.8rem'}}
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: `Bạn có chắc chắn muốn xóa sinh viên ${item.name}?`,
                        subTitle: 'Lưu ý, bạn không thể hoàn tác hành động này!',
                        onConfirm: () => { onDelete(item)}
                      })
                    }}
                  />
                </TableCell>
              </TableRow>)
              )
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
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
