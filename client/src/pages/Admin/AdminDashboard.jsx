import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import styled from "styled-components";
//import ProfilePhoto from "./ProfilePhoto"; // Import the ProfilePhoto component

const Container = styled.div`
  margin-top: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
`;

const CardTitle = styled.h3`
  color: #007bff;
  font-size: 24px;
`;

const CardText = styled.h5`
  margin: 10px 0;
`;



const AdminDashboard = () => {
  const [auth] = useAuth();
  
 

  

  

  return (
    <Layout>
      <Container>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <Card>
                <CardTitle>Seller Information</CardTitle>
                
                <CardText>
                  <strong>Name:</strong> {auth?.user?.name}
                </CardText>
                <CardText>
                  <strong>Email:</strong> {auth?.user?.email}
                </CardText>
                <CardText>
                  <strong>Contact:</strong> {auth?.user?.phone}
                </CardText>
                
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default AdminDashboard;
