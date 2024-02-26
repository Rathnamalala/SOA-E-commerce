import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import Box from "@mui/material/Box";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  Avatar,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
  headerCell: {
    backgroundColor: "#006350",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  card: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const OrderTable = ({ order, classes }) => {
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerCell}>#</TableCell>
            <TableCell className={classes.headerCell}>Status</TableCell>
            <TableCell className={classes.headerCell}>Seller</TableCell>
            <TableCell className={classes.headerCell}>Time</TableCell>
            <TableCell className={classes.headerCell}>Payment</TableCell>
            <TableCell className={classes.headerCell}>Quantity</TableCell>
            <TableCell className={classes.headerCell}>Product</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell
              className={order?.payment.success ? classes.success : classes.failed}
            >
              {order?.status}
            </TableCell>
            <TableCell>
              <Avatar className={classes.avatar}>
                {order?.buyer?.name[0].toUpperCase()}
              </Avatar>
              {order?.buyer?.name}
            </TableCell>
            <TableCell>{moment(order?.createAt).fromNow()}</TableCell>
            <TableCell>
              {order?.payment.success === true && order.payment.id === "COD" ? (
                <p>COH</p>
              ) : order?.payment.success === true ? (
                <p>Success</p>
              ) : (
                <p>Failed</p>
              )}
            </TableCell>
            <TableCell>
              <List>
                {order?.quantities.map((quantityItem, index) => (
                  <ListItem key={index}>
                    <ListItemText>{quantityItem.quantity}Kg</ListItemText>
                  </ListItem>
                ))}
              </List>
            </TableCell>
            <TableCell>
              {order?.products.map((product) => (
                <img
                  key={product._id}
                  src={`/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  style={{ width: "50px", height: "50px", marginRight: "5px" }}
                />
              ))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Orders = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <Container className={classes.tableContainer}>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <Typography variant="h4" align="center" gutterBottom>
              All Orders
            </Typography>
            {orders?.map((order, i) => (
              <Card key={i} className={classes.card}>
                <OrderTable order={order} classes={classes} />
                <Box className={classes.cardContent}>
                  {/* ProductList is not used here. If needed, import and use it. */}
                </Box>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Orders;
