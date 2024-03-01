"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[923],{9923:(e,a,n)=>{n.a(e,(async(e,l)=>{try{n.d(a,{Z:()=>b});var t=n(9867),i=n(1357),s=n(9481),r=n(6885),o=n(2834),m=e([i]);i=(m.then?(await m)():m)[0];const p=(0,r.T)("user"),d=[{name:"supplierName",label:"Supplier name ",value:""},{name:"supplierTradingAs",label:"Supplier trading as ",value:""},{name:"companyRegistrationAbnNo",label:"Company registration ABN no.",value:"",type:"number"},{name:"companyRegistrationAcnNo",label:"Company registration ACN no. ",value:"",type:"number"},{name:"website",label:"Website ",value:""},{name:"bsb",label:"BSB",value:""},{name:"bankAccountNumber",label:"Bank Account Number",value:"",type:"number"},{name:"bankAccountName",label:"Bank Account Name",value:""},{name:"localOrOverseasSupplier",label:"Local / Overseas supplier ",value:"",options:[{name:"Local"},{name:"International"}]},{name:"supplierAddress",label:"Supplier address",value:""},{name:"country",label:"Country ",value:""},{name:"state",label:"State",value:""},{name:"subUrb",label:"Suburb",value:""},{name:"postCode",label:"Postcode",value:"",type:"number"},{name:"contactPersonName",label:"Contact person name",value:""},{name:"supplierPhoneNumber",label:"Phone number ",value:"",type:"number"},{name:"supplierEmailId",label:"Email id ",value:""},{name:"24x7ContactPersonName",label:"24x7 contact person name (if any) ",value:""},{name:"contactPersonPhoneNumber",label:"Phone number ",value:"",type:"number"},{name:"contactPersonEmailId",label:"Email id ",value:""},{name:"paymentTerms",label:"Payment terms",value:""},{name:"specialConditionsOrAdditionalNotes",label:"Special conditions or additional notes ",value:""},{name:"supplierCategory",label:"Supplier category ",value:"Non-critical Supplier",options:[{name:"Critical Supplier"},{name:"Non-critical Supplier"}]},{name:"supplierType",label:"Supplier category ",value:"Cloud Service Provider",options:[{name:"Cloud Service Provider"},{name:"Manage Service Provider"}]},{name:"serviceManaged",label:"Service managed (if any) ",value:""},{name:"purposeOfSupplier",label:"Purpose of supplier ",value:""},{name:"dataSharedWithSupplier",label:"Data shared with supplier ",value:""},{name:"departmentManagingSupplier",label:"Department managing supplier ",value:""},{name:"supplierOwner",label:"Supplier owner ",value:"",options:[{}]},{name:"slaDetails",label:"SLA details ",value:""},{name:"creditLimit",label:"Credit limit ",value:"",type:"number"},{name:"ISO27001",label:"ISO 27001 Certified and valid",value:"Yes",options:[{name:"Yes"},{name:"No"}]},{name:"ISO9001",label:"ISO 9001 Certified and valid",value:"Yes",options:[{name:"Yes"},{name:"No"}]},{name:"ISO14001",label:"ISO 14001 Certified and valid ",value:"",options:[{name:"Yes"},{name:"No"}]},{name:"ISO45001",label:"ISO 45001 Certified and valid ",value:"",options:[{name:"Yes"},{name:"No"}]},{name:"modernSlaveryActApplicable",label:"Modern Slavery Act applicable ",value:"Yes",options:[{name:"Yes"},{name:"No"}]},{name:"modernSlaveryStatementPublishedDate",label:"Modern Slavery Statement published date",value:"",type:"date"},{name:"anyOtherCertification",label:"Any other certification",value:"Yes",options:[{name:"Yes"},{name:"No"}]},{name:"estimatedAnnualBudgetValue",label:"Estimated annual budget value ",value:"",type:"number"},{name:"contractCommencementDate",label:"Contract Commencement date ",value:""},{name:"contractEndDate",label:"Contract end date ",value:""},{name:"Sensitivity_of_data_involved",label:"Sensitivity of data involved (CIA Impact) ",value:"Availability",options:[{name:"Confidentiality"},{name:"Integrity"},{name:"Availability"}]},{name:"threat",label:"Threat ",value:""},{name:"matrix_to_be_used_for_risk_assessment",label:"Matrix to be used for risk assessment ",value:"3X3",options:[{name:"3X3"},{name:"5X5"}]},{name:"likelihood",label:"Likelihood ",value:"Rare 1",options:[{name:"Almost Certain 3"},{name:"Possible 2"},{name:"Rare 1"}]},{name:"impact",label:"Impact ",value:"Insignificant 1",options:[{name:"Insignificant 1"},{name:"Moderate 2"},{name:"Significant 3"}]},{name:"inherent_risk_level",label:"Inherent Risk level/rating ",value:"",disabled:!0},{name:"risk_assessment_completed",label:"Risk Assessment completed ",value:"No",options:[{name:"Yes"},{name:"No"}]},{name:"supplier_assessment_required",label:"Supplier assessment required ",value:"Yes",options:[{name:"Yes"},{name:"No"}]},{name:"supplier_assessment_due_date",label:"Supplier assessment due date ",value:"",type:"date"},{name:"supplier_assessment_status",label:"Supplier Assessment status ",value:"Not Due",options:[{name:"Not Due"},{name:"Not Yet Started"},{name:"In Progress"},{name:"Completed"}]},{name:"supplier_assessment_reviewer_person",label:"Supplier assessment reviewer person ",value:""},{name:"supplier_agreement ",label:"Supplier agreement ",value:"Yes",options:[{name:"Yes"},{name:"No"}]},{name:"supplier_approval_status",label:"Supplier approval status ",value:"Draft ",options:[{name:"Draft "},{name:"approved "},{name:"rejected"}]},{name:"date_entered ",label:"Date entered ",value:"",type:"date"},{name:"decision_date ",label:"Decision date ",value:"",type:"date"}],c=[{name:"supplierName",label:"Supplier name ",value:""},{name:"supplierTradingAs",label:"Supplier trading as ",value:""},{name:"companyRegistrationAbnNo",label:"Company registration ABN no.",value:"",type:"number"},{name:"companyRegistrationAcnNo",label:"Company registration ACN no. ",value:"",type:"number"},{name:"website",label:"Website ",value:""},{name:"bsb",label:"BSB",value:""},{name:"bankAccountNumber",label:"Bank Account Number",value:"",type:"number"},{name:"bankAccountName",label:"Bank Account Name",value:""},{name:"localOrOverseasSupplier",label:"Local / Overseas supplier ",value:"",options:[{name:"Local"},{name:"International"}]},{name:"supplierAddress",label:"Supplier address",value:""},{name:"country",label:"Country ",value:""},{name:"state",label:"State",value:""},{name:"subUrb",label:"Suburb",value:""},{name:"postCode",label:"Postcode",value:"",type:"number"},{name:"contactPersonName",label:"Contact person name",value:""},{name:"supplierPhoneNumber",label:"Phone number ",value:"",type:"number"},{name:"supplierEmailId",label:"Email id ",value:""},{name:"24x7ContactPersonName",label:"24x7 contact person name (if any) ",value:""},{name:"contactPersonPhoneNumber",label:"Phone number ",value:"",type:"number"},{name:"contactPersonEmailId",label:"Email id ",value:""},{name:"paymentTerms",label:"Payment terms",value:""},{name:"specialConditionsOrAdditionalNotes",label:"Special conditions or additional notes ",value:""},{name:"supplierCategory",label:"Supplier category ",value:"Non-critical Supplier",options:[{name:"Critical Supplier"},{name:"Non-critical Supplier"}]},{name:"supplierType",label:"Supplier category ",value:"Cloud Service Provider",options:[{name:"Cloud Service Provider"},{name:"Manage Service Provider"}]},{name:"serviceManaged",label:"Service managed (if any) ",value:""},{name:"purposeOfSupplier",label:"Purpose of supplier ",value:""},{name:"dataSharedWithSupplier",label:"Data shared with supplier ",value:""},{name:"departmentManagingSupplier",label:"Department managing supplier ",value:""},{name:"supplierOwner",label:"Supplier owner ",value:"",options:[{}]},{name:"slaDetails",label:"SLA details ",value:""},{name:"creditLimit",label:"Credit limit ",value:"",type:"number"},{name:"ISO27001",label:"ISO 27001 Certified and valid",value:"Yes",options:[{name:"Yes"},{name:"No"}]},{name:"ISO9001",label:"ISO 9001 Certified and valid",value:"Yes",options:[{name:"Yes"},{name:"No"}]},{name:"ISO14001",label:"ISO 14001 Certified and valid ",value:"Yes",options:[{name:"Yes"},{name:"No"}]},{name:"ISO45001",label:"ISO 45001 Certified and valid ",value:"Yes",options:[{name:"Yes"},{name:"No"}]},{name:"modernSlaveryActApplicable",label:"Modern Slavery Act applicable ",value:"Yes",options:[{name:"Yes"},{name:"No"}]},{name:"modernSlaveryStatementPublishedDate",label:"Modern Slavery Statement published date",value:"",type:"date"},{name:"anyOtherCertification",label:"Any other certification",value:"Yes",options:[{name:"Yes"},{name:"No"}]},{name:"estimatedAnnualBudgetValue",label:"Estimated annual budget value ",value:"",type:"number"},{name:"contractCommencementDate",label:"Contract Commencement date ",value:"",type:"date"},{name:"contractEndDate",label:"Contract end date ",value:"",type:"date"},{name:"Sensitivity_of_data_involved",label:"Sensitivity of data involved (CIA Impact) ",value:"Availability",options:[{name:"Confidentiality"},{name:"Integrity"},{name:"Availability"}]},{name:"threat",label:"Threat ",value:""},{name:"matrix_to_be_used_for_risk_assessment",label:"Matrix to be used for risk assessment ",value:"3X3",options:[{name:"3X3"},{name:"5X5"}]},{name:"likelihood",label:"Likelihood ",value:"Rare 1",options:[{name:"Almost Certain 3"},{name:"Possible 2"},{name:"Rare 1"}]},{name:"impact",label:"Impact ",value:"Insignificant 1",options:[{name:"Insignificant 1"},{name:"Moderate 2"},{name:"Significant 3"}]},{name:"inherent_risk_level",label:"Inherent Risk level/rating ",value:"",disabled:!0},{name:"risk_assessment_completed",label:"Risk Assessment completed ",value:"No",options:[{name:"Yes"},{name:"No"}]},{name:"supplier_assessment_required",label:"Supplier assessment required ",value:"Yes",options:[{name:"Yes"},{name:"No"}]},{name:"supplier_assessment_due_date",label:"Supplier assessment due date ",value:"",type:"date"},{name:"supplier_assessment_status",label:"Supplier Assessment status ",value:"Not Due",options:[{name:"Not Due"},{name:"Not Yet Started"},{name:"In Progress"},{name:"Completed"}]},{name:"supplier_assessment_reviewer_person",label:"Supplier assessment reviewer person ",value:""},{name:"supplier_agreement",label:"Supplier agreement ",value:"Yes",options:[{name:"Yes"},{name:"No"}]},{name:"supplier_approval_status",label:"Supplier approval status ",value:"Draft ",options:[{name:"Draft "},{name:"approved"},{name:"rejected"}]},{name:"date_entered",label:"Date entered ",value:"",type:"date"},{name:"decision_date",label:"Decision date ",value:"",type:"date"}];function b(e){let{addNewSupplier:a,updateSupplier:n,closeModal:l,update:r=!1,createUser:m,updateData:u={},isUpdate:b=!1}=e;const[v,g]=(0,t.useState)([]),[y,f]=(0,t.useState)("new"),[S,h]=(0,t.useState)([]);(0,t.useEffect)((()=>{"new"===y?(h(c),N()):"existing"===y&&h(d),b&&(f(u.supplierType),"new"===u.supplierType?(c.forEach((e=>{e.value=u[e.name]})),N(),console.log(c)):d.forEach((e=>{e.value=u[e.name]})))}),[y]);const x=function(e,a){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"text";if(console.log("type",n),"number"===n&&!/^[0-9]*$/.test(a))return;h((n=>{const l=n.findIndex((a=>a.name===e)),t=[...n];if(t[l].value=a,"matrix_to_be_used_for_risk_assessment"===e){const e=n.findIndex((e=>"likelihood"===e.name)),l=n.findIndex((e=>"impact"===e.name));"3X3"===a?(t[e].options=[{name:"Almost Certain 3"},{name:"Possible 2"},{name:"Rare 1"}],t[e].value="Rare 1",t[l].options=[{name:"Insignificant 1"},{name:"Moderate 2"},{name:"Significant 3"}],t[l].value="Insignificant 1"):(t[e].options=[{name:"Almost Certain 5"},{name:"Likely 4"},{name:"Possible 3"},{name:"Unlikely 2 "},{name:"Rare 1"}],t[e].value="Rare 1",t[l].options=[{name:"Severe 5"},{name:"Major 4"},{name:"Moderate 3"},{name:"Minor 2 "},{name:"Insignificant 1"}],t[l].value="Insignificant 1"),console.log(t)}const i=n.findIndex((e=>"inherent_risk_level"===e.name)),s=n.findIndex((e=>"likelihood"===e.name)),r=n.findIndex((e=>"impact"===e.name)),o=t[s].value,m=t[r].value;t[i].value="",console.log(o,m);let u="";return"Almost Certain 3"===o&&"Insignificant 1"===m&&(u="Medium 4"),"Almost Certain 3"===o&&"Moderate 2"===m&&(u="High 5"),"Almost Certain 3"===o&&"Significant 3"===m&&(u="Extreme 6"),"Possible 2"===o&&"Insignificant 1"===m&&(u="Low 3"),"Possible 2"===o&&"Moderate 2"===m&&(u="Medium 4"),"Possible 2"===o&&"Significant 3"===m&&(u="High 5"),"Rare 1"===o&&"Insignificant 1"===m&&(u="Low 2"),"Rare 1"===o&&"Moderate 2"===m&&(u="Low 3"),"Rare 1"===o&&"Significant 3"===m&&(u="Medium 4 5"),"Almost Certain 5"===o&&"Insignificant 1"===m&&(u="Medium 6"),"Almost Certain 5"===o&&"Minor 2"===m&&(u="High 7"),"Almost Certain 5"===o&&"Moderate 3"===m&&(u="Extreme 8"),"Almost Certain 5"===o&&"Major 4"===m&&(u="Extreme 9"),"Almost Certain 5"===o&&"Severe 5"===m&&(u="Extreme 10"),"Likely 4"===o&&"Insignificant 1"===m&&(u="Medium 5"),"Likely 4"===o&&"Minor 2"===m&&(u="Medium 6"),"Likely 4"===o&&"Moderate 3"===m&&(u="High 7"),"Likely 4"===o&&"Major 4"===m&&(u="Extreme 8"),"Likely 4"===o&&"Severe 5"===m&&(u="Extreme 9"),"Possible 3"===o&&"Insignificant 1"===m&&(u="Low 4"),"Possible 3"===o&&"Minor 2"===m&&(u="Medium 5"),"Possible 3"===o&&"Moderate 3"===m&&(u="Medium 6"),"Possible 3"===o&&"Major 4"===m&&(u="High 7"),"Possible 3"===o&&"Severe 5"===m&&(u="Extreme 8"),"Unlikely 2"===o&&"Insignificant 1"===m&&(u="Low 3"),"Unlikely 2"===o&&"Minor 2"===m&&(u="Low 4"),"Unlikely 2"===o&&"Moderate 3"===m&&(u="Medium 5"),"Unlikely 2"===o&&"Major 4"===m&&(u="Medium 6"),"Unlikely 2"===o&&"Severe 5"===m&&(u="High 7"),"Rare 1"===o&&"Insignificant 1"===m&&(u="Low 2"),"Rare 1"===o&&"Minor 2"===m&&(u="Low 3"),"Rare 1"===o&&"Moderate 3"===m&&(u="Low 4"),"Rare 1"===o&&"Major 4"===m&&(u="Medium 5"),"Rare 1"===o&&"Severe 5"===m&&(u="Medium 6"),console.log(u),t[i].value=u,t}));const l=S.reduce(((e,a)=>({...e,[a.name]:a.value})),{});console.log(l)},N=async()=>{const e=await i.Z.get("/user/?company_id=".concat(null===p||void 0===p?void 0:p.company_id));console.log("userlist",e),h((a=>{const n=[...a],l=a.findIndex((e=>"supplierOwner"===e.name)),t=[];return e.data.forEach((e=>{t.push({value:e.id,name:"".concat(e.first_name," ").concat(e.last_name)})})),console.log("owner",t),n[l].options=t,n}))};return(0,o.jsx)(s.Z,{children:(0,o.jsx)("form",{onSubmit:e=>(async e=>{e.preventDefault(),console.log(u);const l=S.reduce(((e,a)=>({...e,[a.name]:a.value})),{});let t="";l.supplierType=y,l.companyId=null===p||void 0===p?void 0:p.company_id,console.log(l),!1===b?t=await i.Z.post("supplier",{supplier:l}):!0===b&&(t=await i.Z.put("supplier/".concat(u.id),l)),console.log(t),b?n():a()})(e),children:(0,o.jsx)("div",{className:"fixed inset-0 z-10 overflow-y-auto rounded-lg ",children:(0,o.jsxs)("div",{className:"flex items-end justify-center min-h-screen h-40 pt-4 px-4 pb-20 text-center sm:block sm:p-0",children:[(0,o.jsx)("div",{className:"fixed inset-0 transition-opacity","aria-hidden":"true",children:(0,o.jsx)("div",{className:"absolute inset-0 bg-gray-500 opacity-75"})}),(0,o.jsxs)("div",{className:"inline-block align-bottom bg-white border-2 rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle w-[70vh]",children:[(0,o.jsx)("div",{className:"bg-secondary px-4 rounded-lg pt-5 pb-4 sm:p-6 sm:pb-4 !important rounded-lg",children:(0,o.jsxs)("div",{className:"border p-4 bg-primary rounded-lg",children:[(0,o.jsxs)("div",{className:"pb-5",children:[(0,o.jsx)("h2",{className:"text-lg font-semibold mb-4",children:"Create Suppliers"}),(0,o.jsxs)("select",{id:y,value:y,onChange:e=>(e=>{console.log(e.target.value),f(e.target.value)})(e),className:"mt-1 p-2 border rounded-lg w-35",required:!0,children:[(0,o.jsx)("option",{selected:!0,disabled:!0,value:"",children:"Choose Supplier Type"},"1"),(0,o.jsx)("option",{value:"new",children:"New Supplier"},"new")]})]}),S.length>0&&S.map((e=>(0,o.jsx)("div",{className:"mb-4 relative z-0",children:e.options?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("label",{for:e.name,class:"absolute text-sm text-textAccent dark:text-green-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",children:e.label}),(0,o.jsxs)("select",{id:e.name,value:e.value,onChange:a=>x(e.name,a.target.value,e.type),className:"mt-1 p-2 border rounded w-full",required:!0,children:[(0,o.jsxs)("option",{disabled:!0,children:["Select ",e.label]},e.value),e.options.map((e=>(0,o.jsx)("option",{value:e.value,children:e.name},e.name)))]})]}):(0,o.jsx)("div",{children:(0,o.jsxs)("div",{class:"relative z-0",children:[(0,o.jsx)("input",{value:e.value,onChange:a=>x(e.name,a.target.value,e.type),type:"date"===e.type?"date":"text",id:e.name,required:!0,"aria-describedby":"standard_success_help",className:"block py-2.5 px-0 w-full text-sm text-textAccent bg-transparent border-0 border-b-2 border-textAccent appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 peer ".concat(!0===e.disabled?"cursor-not-allowed":""),placeholder:" "}),(0,o.jsx)("label",{for:e.name,class:"absolute text-sm text-textAccent dark:text-green-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",children:e.label})]})})},e.name)))]})}),(0,o.jsxs)("div",{className:"bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-lg",children:[(0,o.jsx)("button",{onClick:()=>l(),type:"button",className:"mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",children:"Cancel"}),(0,o.jsx)("button",{className:"bg-blue-500 text-white p-2 rounded",children:!0===b?"Update Supplier":"Save Supllier"})]})]})]})})})})}l()}catch(u){l(u)}}))}}]);
//# sourceMappingURL=923.491dabda.chunk.js.map