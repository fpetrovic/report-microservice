import _ from 'lodash';
import axios from 'axios';

interface ReportTemplate {
  id:string,
}

const reportTemplateApi = () => ({
  async create(id: string, payload = {}) {
    const { data } = await axios.post('/api/report_templates', payload);
    return data;
  },
  async get(id: string) {
    const { data } = await axios.get(`/api/report_templates/${id}`);
    return data;
  },
  async getAll() {
    const { data } = await axios.get('/api/report_templates');
    return data;
  },
  async update(reportTemplate: ReportTemplate) {
    const { data } = await axios.put(
      `/api/report_templates/${reportTemplate.id}`,
      _.pick(reportTemplate, ['name']),
    );
    return data;
  },
  async delete(reportTemplate: ReportTemplate) {
    await axios.delete(`/api/report_templates/${reportTemplate.id}`);
  },
});

export default reportTemplateApi;
