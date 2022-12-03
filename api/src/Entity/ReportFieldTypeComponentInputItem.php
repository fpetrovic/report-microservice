<?php

declare(strict_types=1);

namespace App\Entity;

use App\Entity\Trait\IdTrait;
use App\Entity\Trait\Sortable;
use Doctrine\ORM\Mapping\Column;

class ReportFieldTypeComponentInputItem
{
    use IdTrait;
    use Sortable;

    // example status
    #[Column(type: 'string', length: 255, nullable: false)]
    private string $name;

    // example Select all statuses
    #[Column(type: 'string', length: 255, nullable: false)]
    private string $componentInputItem;
}
