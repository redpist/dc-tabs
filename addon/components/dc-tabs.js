import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'dc-tabs',
  activeTab: null,
  'selected-index': 0,

  tabPanels: Ember.computed(function() {
    return Ember.ArrayProxy.create({
      content: Ember.A()
    });
  }),

  select(tab) {
    const tabIndex = tab.get('custom-index') || tab.get('index');
    this.set('activeTab', tab);
    this.set('selected-index', tabIndex);
  },

  actions: {
    registerTabList(tabList) {
      this.set('tabList', tabList);
    },

    registerTabPanel(tabPanel) {
      this.get('tabPanels').addObject(tabPanel);
    },

    unregisterTabPanel(tabPanel) {
      this.get('tabPanels').removeObject(tabPanel);
    }
  }
});
