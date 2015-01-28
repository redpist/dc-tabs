import Ember from 'ember';

export default Ember.Controller.extend({
  selectedTabIndex: 0,

  tabs: [{
    name: 'Tikka Masala',
    description: "Chicken tikka masala is chicken tikka, chunks of chicken marinated in spices and yogurt, that is then baked in a tandoor oven, and served in a masala (spice mix) sauce. A tomato and coriander sauce is common, but there is no standard recipe for chicken tikka masala; a survey found that of 48 different recipes, the only common ingredient was chicken. The sauce usually includes tomatoes, frequently as puree; cream and/or coconut cream; and various spices. The sauce or chicken pieces (or both) are coloured orange with food dyes or using foodstuffs such as turmeric powder, paprika powder or tomato purée. Other tikka masala dishes replace chicken with lamb, fish or paneer."
  }],

  adding: false,

  newTab: {},

  actions: {
    editNewTab: function() {
      this.set('adding', true);
    },

    saveNewTab: function() {
      var tabs = this.get('tabs').addObject(this.get('newTab')).length;
      this.set('adding', false);
      this.set('newTab', {});
    },

    removeTab: function(tab) {
      this.get('tabs').removeObject(tab);
    }
  }
});
