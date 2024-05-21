import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserManagementContext } from "../../context/UserManagementContext";
import CustomLayout from "../shared/CustomLayout";
import { getUserList } from "../../api/api";
import { useTheme } from "@emotion/react";

const UserDetails = () => {
  const { id } = useParams();
  const { userList, setUserList } = React.useContext(UserManagementContext);
  const [detail, setDetail] = useState({});
  const theme = useTheme();

  const getDetailsOnID = () => {
    if (userList.length === 0) {
      getUserList(setUserList);
    }

    if (userList.length > 0 && !isNaN(id)) {
      const details = userList.find((res) => res.id === parseInt(id));
      setDetail(details);
    }
  };

  useEffect(() => {
    getDetailsOnID();
  }, [id, userList]);

  return (
    <CustomLayout>
      <Typography variant="h5" textAlign="center" m={4}>
        USER DETAIL
      </Typography>
      {detail && (
        <Card
          sx={{
            background: "white",
            minHeight: "700px",
            padding: "4rem",
            [theme.breakpoints.down("sm")]: { padding: "0px" },
          }}
        >
          <Stack
            direction={{ sm: "column", md: "row" }}
            columnGap={2}
            rowGap={2}
          >
            <TextField
              disabled
              id="outlined-disabled"
              label="Name"
              value={detail?.name || ""}
              fullWidth
            />
            <TextField
              disabled
              id="outlined-disabled"
              label="Username"
              value={detail?.username || ""}
              fullWidth
            />
          </Stack>
          <br />
          <Stack
            direction={{ sm: "column", md: "row" }}
            columnGap={2}
            rowGap={2}
          >
            <TextField
              disabled
              id="outlined-disabled"
              label="Email address"
              value={detail?.email || ""}
              fullWidth
            />
            <TextField
              disabled
              id="outlined-disabled"
              label="Phone number"
              value={detail?.phone || ""}
              fullWidth
            />
          </Stack>
          <br />
          <TextField
            disabled
            id="outlined-disabled"
            label="Website"
            value={detail?.website || ""}
            fullWidth
          />
          <br />
          <br />

          <Typography>House Address</Typography>
          <br />

          <Stack
            direction={{ sm: "column", md: "row" }}
            columnGap={2}
            rowGap={2}
          >
            <TextField
              disabled
              id="outlined-disabled"
              label="Street"
              value={detail?.address?.street || ""}
              fullWidth
            />
            <TextField
              disabled
              id="outlined-disabled"
              label="Suite"
              value={detail?.address?.suite || ""}
              fullWidth
            />
          </Stack>
          <br />
          <Stack
            direction={{ sm: "column", md: "row" }}
            columnGap={2}
            rowGap={2}
          >
            <TextField
              disabled
              id="outlined-disabled"
              label="City"
              value={detail?.address?.city || ""}
              fullWidth
            />
            <TextField
              disabled
              id="outlined-disabled"
              label="Zipcode"
              value={detail?.address?.zipcode || ""}
              fullWidth
            />
          </Stack>
          <br />

          <Typography>Company details</Typography>
          <br />
          <TextField
            disabled
            id="outlined-disabled"
            label="Company name"
            value={detail?.company?.name || ""}
            fullWidth
          />
          <br />
          <br />

          <TextField
            disabled
            id="outlined-disabled"
            label="CatchPhrase"
            defaultValue={detail?.company?.catchPhrase || ""}
            fullWidth
          />
          <br />
          <br />

          <TextField
            disabled
            id="outlined-disabled"
            label="BS"
            defaultValue={detail?.company?.bs || ""}
            fullWidth
          />

          <Stack alignItems="end">
            <Button
              href="/"
              variant="contained"
              sx={{ marginTop: "2rem !important" }}
            >
              BACK
            </Button>
          </Stack>
        </Card>
      )}
    </CustomLayout>
  );
};

export default UserDetails;
