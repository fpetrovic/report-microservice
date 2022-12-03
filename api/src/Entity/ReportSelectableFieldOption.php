<?php

declare(strict_types=1);

namespace App\Entity;

use App\Entity\Trait\IdTrait;
use App\Entity\Trait\SoftDeletableProperties;
use App\Entity\Trait\TimestampableProperties;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Symfony\Component\Serializer\Annotation\Groups;

// @todo create report template entity pairs.
// Report template fields shouldn't be aware of values!
#[Entity]
class ReportSelectableFieldOption
{
    use TimestampableProperties;
    use SoftDeletableProperties;
    use IdTrait;

    #[Column(type: 'string', length: 255, nullable: false)]
    #[Groups(['reportField:read', 'reportField:write', 'baseReport:item:read'])]
    private string $name;

    #[Column(type: 'boolean', nullable: false)]
    #[Groups(['reportField:read', 'reportField:write', 'report:item:read'])]
    private bool $isSelected = false;
}
