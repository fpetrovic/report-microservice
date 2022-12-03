<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Entity\Interface\EntityFileOwnerInterface;
use App\State\ReportFileFieldStateProcessor;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\OneToMany;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(openapi: false),
    ],
)]
#[Post(processor: ReportFileFieldStateProcessor::class)]
#[Put(processor: ReportFileFieldStateProcessor::class)]
#[Entity]
class ReportFileField extends ReportField implements EntityFileOwnerInterface
{
    /**
     * @var Collection<int,File> $files
     * */
    #[OneToMany(mappedBy: 'entityFileOwner', targetEntity: FileReportFileField::class)]
    #[Groups(['report:item:read', 'report:item:write'])]
    private Collection $files;
}
