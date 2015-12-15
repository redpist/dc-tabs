import Ember from 'ember';

const {
  A,
  ArrayProxy,
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: 'dc-tabs',
  activeTab: null,
  selectedIndex: 0,
  'selected-index': Ember.computed(
    'selectedIndex',
    'tabPanels.[]',
    'tabPanels.@each.custom-index',
    {
      set(key, value) {
        this.set('selectedIndex', value)
        return value
      },
      get(key) {
        const selectedIndex = this.get('selectedIndex');
        const index = parseInt(this.get('selectedIndex'), 10);

        const selected = this.get('tabPanels').find(
          function (item, myIndex, enumerable) {
            return (index === myIndex) || (item.get('custom-index') && item.get('custom-index') === selectedIndex);
          }
        );
        if (Ember.isNone(selected)) {
          return 0;
        }
        return selectedIndex;
      }
    }
  ),

  tabPanels: computed(function() {
    return ArrayProxy.create({
      content: new A()
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
