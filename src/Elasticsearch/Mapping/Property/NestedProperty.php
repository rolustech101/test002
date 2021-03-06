<?php
/*
 * Your installation or use of this SugarCRM file is subject to the applicable
 * terms available at
 * http://support.sugarcrm.com/06_Customer_Center/10_Master_Subscription_Agreements/.
 * If you do not agree to all of the applicable terms or do not have the
 * authority to bind the entity as an authorized representative, then do not
 * install or use this SugarCRM file.
 *
 * Copyright (C) SugarCRM Inc. All rights reserved.
 */

namespace Sugarcrm\Sugarcrm\Elasticsearch\Mapping\Property;

/**
 *
 * This mapping property defines a nested object property. This object
 * extends from the ObjectProperty and the same rules apply that such
 * objects cannot be stacked on top as a regular MultiFieldProperty
 * and need to be created on a dedicated field.
 *
 */
class NestedProperty extends ObjectProperty implements PropertyInterface
{
    /**
     * @var string
     */
    protected $type = 'nested';
}
