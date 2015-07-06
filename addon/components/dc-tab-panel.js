import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'dc-tab-panel',

  attributeBindings: [
    'role',
    'aria-labeledby'
  ],

  // TODO: remove this, toggleVisibility won't fire w/o it though (?)
  classNameBindings: ['active'],

  tabsComponent: Ember.computed.alias('parentView'),
  target: Ember.computed.alias('tabsComponent'),

  role: 'tabpanel',

  tabList: Ember.computed.alias('tabsComponent.tabList'),

  tabPanels: Ember.computed.alias('tabsComponent.tabPanels'),

  'aria-labeledby': Ember.computed.alias('tab.elementId'),

  willInsertElement() {
    this.send('registerTabPanel', this);
  },

  didInsertElement() {
    this.send('unregisterTabPanel', this);
  },

  tab: Ember.computed('tabList.tabs.@each', 'tabPanels.@each', function() {
    var index = this.get('tabPanels').indexOf(this);
    var tabs = this.get('tabList.tabs');
    return tabs && tabs.objectAt(index);
  }),

  active: Ember.computed('tab.active', function() {
    return this.get('tab.active');
  }),

  toggleVisibility: Ember.observer('active', function() {
    var display = this.get('active') ? '' : 'none';
    this.$().css('display', display);
  })
});
