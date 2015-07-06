import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'dc-tab-list',

  attributeBindings: [
    'role',
    'aria-multiselectable'
  ],

  tabsComponent: Ember.computed.alias('parentView'),
  target: Ember.computed.alias('tabsComponent'),

  role: 'tablist',

  'aria-multiselectable': false,

  activeTab: Ember.computed.alias('tabsComponent.activeTab'),

  willInsertElement() {
    this.send('registerTabList', this);
  },

  tabs: Ember.computed(function() {
    return Ember.ArrayProxy.create({
      content: Ember.A()
    });
  }),

  navigateOnKeyDown: Ember.on('keyDown', function(event) {
    const  key = event.keyCode;
    if (key === 37 /*<*/ || key === 38 /*^*/) {
      this.selectPrevious();
    } else if (key === 39 /*>*/ || key === 40 /*v*/) {
      this.selectNext();
    } else {
      return;
    }
    event.preventDefault();
  }),

  activeTabIndex: Ember.computed('activeTab', function() {
    return this.get('tabs').indexOf(this.get('activeTab'));
  }),

  selectNext() {
    let index = this.get('activeTabIndex') + 1;
    if (index === this.get('tabs.length')) {
      index = 0;
    }
    this.selectTabAtIndex(index);
  },

  selectPrevious() {
    let index = this.get('activeTabIndex') - 1;
    if (index === -1) {
      index = this.get('tabs.length') - 1;
    }
    this.selectTabAtIndex(index);
  },

  selectTabAtIndex(index) {
    const tab = this.get('tabs').objectAt(index);
    tab.select({ focus: true });
  },

  actions: {
    registerTab(tab) {
      this.get('tabs').addObject(tab);
    },

    unregisterTab(tab) {
      this.get('tabs').removeObject(tab);
    }
  }
});
