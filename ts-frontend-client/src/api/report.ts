import _ from 'lodash';
import axios from 'axios';

interface Report {
  id:string,
}

const reportApi = () => ({
  async create(id:string, payload = {}) {
    const { data } = await axios.post('/api/reports', payload);
    return data;
  },
  async get(id:string) {
    const { data } = await axios.get(`/api/reports/${id}`);
    return data;
  },
  async getAll() {
    const { data } = await axios.get('/api/reports');
    return data;
  },
  async update(report:Report) {
    const { data } = await axios.put(
      `/api/reports/${report.id}`,
      _.pick(report, ['name']),
    );
    return data;
  },
  async delete(report:Report) {
    await axios.delete(`/api/reports/${report.id}`);
  },

  async generateFromTemplate(reportTemplateId: string) {
    await axios.delete(`/api/reports/generate-from-template/${reportTemplateId}`);
  }
});

export default reportApi;
