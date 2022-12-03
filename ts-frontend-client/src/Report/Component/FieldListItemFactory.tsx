import {
  Checkbox, Input, Radio, Select, TextArea,
} from 'semantic-ui-react';
import {ReportField} from "../../interfaces/reportfield";

function FieldListItemFactory(field: ReportField, isTemplate: boolean = false) {
  switch (field.reportFieldType) {
    case 'short-text':
      return <Input name={field.name} value={field.value} disabled={isTemplate} />;
    case 'long-text':
      return <TextArea name={field.name} value={field.value} disabled={isTemplate} />;
    case 'radio':
      return ['yes', 'no'].map((value) => <Radio name={field.name} value={field.value} label={value} disabled={isTemplate} />);
    case 'select':
      // const preparedFieldOptionItems = field.options.map((value) => ({ key: value.id, value: value.id, text: value.title }));
      //
      // return <Select options={preparedFieldOptionItems} disabled={isTemplate} />;
    // case 'checkbox':
    //   return field.options.map((value, index) => <Checkbox key={index} label={value.title} name={field.title} disabled={isTemplate} />);
    case 'date':
      /* @todo add date field with calendar widget */
      return <Input name={field.name} value={field.value} disabled={isTemplate} />;
    case 'time':
      /* @todo add date field with calendar widget */
      return <Input name={field.name} value={field.value} disabled={isTemplate} />;
    // case 'file':
    //   /* @todo add file widget for report and report template */
    //   return;
    // case 'record-import':
    //   return (
    //     <div>
    //       <p>
    //         type:
    // {field.filter.type}
    //   </p>
    //   <p>
    //   status:
    // {field.filter.status}
    //   </p>
    //   <p>
    //   priorities:
    // {field.filter.priorities && field.filter.priorities.toString()}
    //   </p>
    //   <p>
    //   category:
    // {field.filter.categories && field.filter.categories.toString()}
    //   </p>
    //   <p>
    //   location:
    // {field.filter.locations && field.filter.locations.toString()}
    //   </p>
    //   </div>
    // );
    // case 'dashboard':
    //   return (
    //     <div>
    //       <p>
    //         type:
    // {field.filter.type}
    //   </p>
    //   <p>
    //   category:
    // {field.filter.category && field.filter.category}
    //   </p>
    //   <p>
    //   categoryGroups:
    // {field.filter.categoryGroups && field.filter.categoryGroups.toString()}
    //   </p>
    //   <p>
    //   isShowCategoriesWithNoIssues:
    // {field.filter.isShowCategoriesWithNoIssues}
    //   </p>
    //   </div>
    // );
    default:
      return undefined;
  }
}

export default FieldListItemFactory;
