import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['country', 'food'],
  country: 0,
  food: 0
});
