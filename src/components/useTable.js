import React, { useState } from 'react';
import { makeStyles, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeigth: '400',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light
        }, '& thead td': {
            fontWeigth: '300'
        }, '& thead tr:hover': {
            cursor: 'pointer',
            backgroundColor: '#ffbf2'
        },
    },
}))

export default function useTable(records, headersCells, filtterFn) {

    const classes = useStyles();
    const pages = [5, 10, 25];
    const [page, setPages] = useState(0);
    const [rowPerPages, setrowPerPages] = useState(pages[page]);
    const [order, setOrder] = useState()
    const [orderById, setOrderById] = useState()


    const TblContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const handleSortRequest = (cellId) => {
        const isAsc = orderById === cellId && order === "asc"
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderById(cellId);
    }
    const TblHead = props => {
        return (<TableHead>
            <TableRow>
                {
                    headersCells.map(item => (<TableCell key={item.id}
                        sortDirection={(orderById === item.id) ? order : false}>
                        {item.desableSorting ? item.label :
                            <TableSortLabel
                                active={orderById === item.id}
                                direction={orderById === item.id ? order : 'asc'}
                                onClick={() => handleSortRequest(item.id)}
                            >
                                {item.label}
                            </TableSortLabel>
                        }
                    </TableCell>)
                    )
                }

            </TableRow>

        </TableHead>)
    }
    const handleChangeRowsPerPage = (event) => {

        setrowPerPages(parseInt(event.taget.value, 10));
        setPages(0)
    }
    const handleChangePage = (event, newPage) => {
        setPages(newPage)
    }

    const TblPaginition = () => (<TablePagination
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowPerPages}
        count={records.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
    />)
    function stableSort(array, comparetor) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparetor(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1]
        });

        return stabilizedThis.map((el) => el[0])
    }

    function getComparator(order, orderById) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderById)
            : (a, b) => - descendingComparator(a, b, orderById)

    }

    function descendingComparator(a, b, order) {
        if (b[orderById] < a[orderById]) {
            return -1;
        } if (b[orderById] > a[orderById]) {
            return 1;
        }
        return 0;
    }
    const recordsAfterPagingAndSorting = () => {
        if (records)
            return stableSort(filtterFn.fn(records),
                getComparator(order, orderById))
                .slice(page * rowPerPages, (page + 1) * rowPerPages)
        else
            return []
    }
    return {
        TblContainer,
        TblHead,
        TblPaginition,
        recordsAfterPagingAndSorting
    }
}