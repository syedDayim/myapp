import React from "react";
import { PDFDownloadLink, Document, Page, Text, View } from "@react-pdf/renderer";

const PDFGenerator = ({ data }) => {
  return (
    <PDFDownloadLink document={<MyDocument data={data} />} fileName="contacts.pdf">
      {({ blob, url, loading, error }) => (loading ? "Generating PDF..." : "Download PDF")}
    </PDFDownloadLink>
  );
};

const MyDocument = ({ data }) => (
  <Document>
    <Page>
      <View>
        <Text>Contact List:</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", flex: 1 }}>No.</Text>
          <Text style={{ fontWeight: "bold", flex: 1 }}>Name</Text>
          <Text style={{ fontWeight: "bold", flex: 1 }}>Email</Text>
          <Text style={{ fontWeight: "bold", flex: 1 }}>Contact</Text>
        </View>
        {data.map((item, index) => (
          <View key={item.id} style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>{index + 1}</Text>
            <Text style={{ flex: 1 }}>{item.name}</Text>
            <Text style={{ flex: 1 }}>{item.email}</Text>
            <Text style={{ flex: 1 }}>{item.contact}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFGenerator;
