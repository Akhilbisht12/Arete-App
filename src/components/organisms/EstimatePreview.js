import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { connect } from "react-redux";
import { BedFeeMaster } from "../../config/BedFee";
import { ColumnCenter, RowBetween } from "../../styles/FlexView";
import PatientDetailedView from "../../styles/PatientDetailsView";
const { width } = Dimensions.get("window");
const EstimatePreview = ({ advice }) => {
  const [wardTotal, setWardTotal] = useState(0);
  const [icuTotal, setIcuTotal] = useState(0);
  const [Total, setTotal] = useState(0);
  useEffect(() => {
    let wardTotal = 0;
    BedFeeMaster.map((item) => {
      if (item.Billing_Code === advice.wardBedType) {
        wardTotal +=
          (advice.isEmergency ? item.Emergency_Fee : item.IP_Fee) * advice.ward;
      }
      setWardTotal(wardTotal);
    });
  }, [advice]);
  useEffect(() => {
    let icutotal = 0;
    BedFeeMaster.map((item) => {
      if (item.Billing_Code === advice.icuBedType) {
        icutotal +=
          (advice.isEmergency ? item.Emergency_Fee : item.IP_Fee) * advice.icu;
      }
      setIcuTotal(icutotal);
    });
  }, [advice]);

  useEffect(()=>{
    let bigtotal = 0
    if(!advice.isIPDPackage){
      bigtotal+=wardTotal+icuTotal
    }
    advice.services.map((item)=>{
      if(item.Department_Type === "SURGERY"){
        let temp = parseInt(item.OPD.replace(",", "")) * item.minor * 0.01
        bigtotal+=temp + temp*0.35 + temp*0.15 + temp*0.9 + temp*0.3
      }else{
        bigtotal+=parseInt(item.OPD.replace(",", ""))
      }
    })

    advice.addCharges.map((item)=>{
      bigtotal+= parseInt(item.value)
    })
    setTotal(bigtotal)
  },[])
  return (
    <PatientDetailedView style={{ backgroundColor: "lightgray" }}>
      <ColumnCenter>
        <Text>
          {advice.isIPDPackage ? "IPD Package Estimate" : "Bill Estimate"}
        </Text>
        <RowBetween style={{ width: 0.85 * width, marginVertical: 5 }}>
          <View
            style={{
              backgroundColor: "white",
              width: 0.4 * width,
              padding: 10,
              borderRadius: 5,
              margin: 2,
            }}
          >
            <Text>Name: </Text>
            <Text>Age: </Text>
            <Text>dob: </Text>
            <Text>Phone: </Text>
            <Text>Email: </Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              width: 0.4 * width,
              padding: 10,
              borderRadius: 5,
              margin: 2,
            }}
          >
            <Text>Emergency: {advice.isEmergency ? "Yes" : "No"}</Text>
            <Text>Doctor: {advice.doctor}</Text>
            <Text>Payment Type: {advice.paymentType}</Text>
            <Text>Payment Company: {advice.paymentCompany}</Text>
            <Text></Text>
          </View>
        </RowBetween>
        <RowBetween style={{ width: 0.85 * width, marginVertical: 5, display : advice.isIPDPackage?'none':'flex' }}>
          <View
            style={{
              backgroundColor: "white",
              width: 0.4 * width,
              padding: 10,
              borderRadius: 5,
              margin: 2,
            }}
          >
            <Text>Total Ward Days: {advice.ward}</Text>
            <Text>Ward Bed Category: {advice.wardBedType}</Text>
            <Text>Total Ward Amout: {wardTotal}</Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              width: 0.4 * width,
              padding: 10,
              borderRadius: 5,
              margin: 2,
            }}
          >
            <Text>Total ICU Days: {advice.icu}</Text>
            <Text>ICU Bed Category: {advice.icuBedType}</Text>
            <Text>Total ICU Amout: {icuTotal}</Text>
          </View>
        </RowBetween>
        <View
          style={{
            width: 0.85 * width,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            margin: 2,
          }}
        >
          <Text style={{ fontSize: 16 }}>Services:</Text>
          {advice.services.map((item) => {
            return (
              <View
                style={{
                  backgroundColor: "lightblue",
                  margin: 1,
                  padding: 5,
                  borderRadius: 2,
                }}
              >
                <Text>{item.Service_Name}</Text>
                <View
                  style={{
                    display:
                      item.Department_Type === "SURGERY" ? "flex" : "none",
                  }}
                >
                  <Text>
                    Surgeon: {item.surgeon[0] ? item.surgeon[0].name : ""}
                  </Text>
                  <Text>
                    Surgeon Fee:{" "}
                    {item.OPD
                      ? parseInt(item.OPD.replace(",", "")) * item.minor * 0.01
                      : ""}
                  </Text>
                  <Text>
                    Assistant Surgeon:{" "}
                    {item.surgeon[1] ? item.surgeon[1].name : ""}
                  </Text>
                  <Text>
                    Assistant Surgeon Fee:{" "}
                    {item.OPD
                      ? parseInt(item.OPD.replace(",", "")) *
                        0.3 *
                        item.minor *
                        0.01
                      : ""}
                  </Text>
                  <Text>
                    OT Charges:{" "}
                    {item.OPD
                      ? parseInt(item.OPD.replace(",", "")) *
                        0.9 *
                        item.minor *
                        0.01
                      : ""}
                  </Text>
                  <Text>
                    Aneasthetist:{" "}
                    {item.OPD
                      ? parseInt(item.OPD.replace(",", "")) *
                        0.35 *
                        item.minor *
                        0.01
                      : ""}
                  </Text>
                  <Text>
                    OT Gases:{" "}
                    {item.OPD
                      ? parseInt(item.OPD.replace(",", "")) *
                        0.15 *
                        item.minor *
                        0.01
                      : ""}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View
          style={{
            width: 0.85 * width,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            margin: 2,
          }}
        >
          <Text style={{ fontSize: 16 }}>Additional Charges:</Text>
          {advice.addCharges.map((item, index) => {
            return (
              <Text key={index}>
                {item.key}: {item.value} INR
              </Text>
            );
          })}
        </View>
        <RowBetween
          style={{
            width: 0.85 * width,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            margin: 2,
          }}
        >
          <Text style={{ fontSize: 16 }}>Sub Total:</Text>
          <Text style={{ fontSize: 16 }}>{Total}</Text>
        </RowBetween>
      </ColumnCenter>
    </PatientDetailedView>
  );
};

const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};

export default connect(mapStateToProps)(EstimatePreview);
