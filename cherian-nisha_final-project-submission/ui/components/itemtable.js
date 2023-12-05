import { Container, TableRow, TableContainer, Paper, Table, TableHead, TableCell, TableBody, Typography } from "@mui/material";

export default function ItemTable({items}) {
    return (
        <TableContainer component={Paper} sx={{ backgroundColor: 'lightgray', width: '70%' }}>
            <Table sx={{ minWidth: 650 }} aria-label="item table">
                <TableHead >
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Link</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Website</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow
                            key={item.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell align="right">{item.price}</TableCell>
                            <TableCell align="right"><a href={item.link}>Link</a></TableCell>
                            <TableCell align="right">{item.website}</TableCell>
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
} 